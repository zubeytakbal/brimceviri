import { convert } from "../../../converter/convert";
import { corsPreflightResponse, jsonResponse } from "../../_lib/cors";
import { getClientIp, isRateLimited } from "../../_lib/rateLimit";
import { isValidCategory, isValidUnit } from "../../_lib/unitLookup";

export async function GET(request: Request) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonResponse(
      { error: "Rate limit exceeded. Max 60 requests per minute." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const rawValue = searchParams.get("value");

  if (!category || !from || !to || rawValue === null) {
    return jsonResponse(
      {
        error:
          "Missing required query parameters: category, from, to, value.",
      },
      { status: 400 }
    );
  }

  if (!isValidCategory(category)) {
    return jsonResponse(
      {
        error: `Unknown category "${category}". See /api/v1/categories for the full list.`,
      },
      { status: 400 }
    );
  }

  if (!isValidUnit(category, from)) {
    return jsonResponse(
      { error: `Unknown unit "${from}" for category "${category}".` },
      { status: 400 }
    );
  }

  if (!isValidUnit(category, to)) {
    return jsonResponse(
      { error: `Unknown unit "${to}" for category "${category}".` },
      { status: 400 }
    );
  }

  const value = Number(rawValue.replace(",", "."));

  if (!Number.isFinite(value)) {
    return jsonResponse(
      { error: `"value" must be a finite number, got "${rawValue}".` },
      { status: 400 }
    );
  }

  const result = convert(category, value, from, to);

  return jsonResponse({ category, from, to, value, result });
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
