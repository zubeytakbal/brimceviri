import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// A server component that imports a constant (not a component) from a "use client"
// module gets a client reference instead of the value: labels render empty or the
// build crashes. Components (PascalCase) are fine; constants must live in
// server-safe modules.
const root = path.join(__dirname, "..", "app");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : /\.(tsx|ts)$/.test(name) ? [full] : [];
  });
}

const isClient = (file: string) => /^\s*["']use client["']/.test(readFileSync(file, "utf8"));

function resolve(from: string, spec: string) {
  const base = spec.startsWith("@/") ? path.join(root, "..", spec.slice(2)) : path.resolve(path.dirname(from), spec);
  for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
    try {
      if (statSync(base + ext).isFile()) return base + ext;
    } catch {
      // try next
    }
  }
  return null;
}

describe("client boundary", () => {
  it("server files import only components (PascalCase) or types from client modules", () => {
    const offenders: string[] = [];
    for (const file of walk(root)) {
      if (isClient(file)) continue;
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/import\s+(?!type)\{([^}]*)\}\s+from\s+["']([^"']+)["']/g)) {
        if (!m[2].startsWith(".") && !m[2].startsWith("@/")) continue;
        const target = resolve(file, m[2]);
        if (!target || !isClient(target)) continue;
        for (const raw of m[1].split(",")) {
          const name = raw.trim().replace(/^type\s+.*/, "").split(/\s+as\s+/)[0];
          if (name && !/^[A-Z][a-z]/.test(name)) offenders.push(`${path.relative(root, file)}: ${name}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
