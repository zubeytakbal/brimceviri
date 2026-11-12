// Testlerde de tsconfig'teki "@/" yol takma adi calissin (icerik dosyalari SiteLink'i "@/app/..." ile alir).
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: [{ find: /^@\//, replacement: fileURLToPath(new URL("./", import.meta.url)) }] },
});
