import { corsPreflightResponse, jsonResponse } from "../../_lib/cors";
import { getApiCategories } from "../../_lib/unitLookup";
import { getClientIp, isRateLimited } from "../../_lib/rateLimit";

export async function GET(request: Request) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonResponse(
      { error: "Rate limit exceeded. Max 60 requests per minute." },
      { status: 429 }
    );
  }

  return jsonResponse({ categories: getApiCategories() });
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
