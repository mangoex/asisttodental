import { NextRequest } from "next/server";

const pixelId =
  process.env.META_PIXEL_ID ||
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  "27632556786333099";
const accessToken = process.env.META_ACCESS_TOKEN;
const graphApiVersion = process.env.META_GRAPH_API_VERSION || "v24.0";
const testEventCode = process.env.META_TEST_EVENT_CODE;

type MetaEventPayload = {
  eventName?: string;
  eventId?: string;
  customData?: Record<string, unknown>;
  sourceUrl?: string;
};

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();

  return request.headers.get("x-real-ip") || undefined;
}

function getStringValue(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

export async function POST(request: NextRequest) {
  let body: MetaEventPayload;

  try {
    body = (await request.json()) as MetaEventPayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = getStringValue(body.eventName);

  if (!eventName) {
    return Response.json(
      { ok: false, error: "Missing eventName" },
      { status: 400 }
    );
  }

  if (!accessToken) {
    return Response.json({
      ok: true,
      skipped: "META_ACCESS_TOKEN is not configured",
    });
  }

  const userData: Record<string, string> = {};
  const userAgent = request.headers.get("user-agent");
  const clientIp = getClientIp(request);
  const fbp = request.cookies.get("_fbp")?.value;
  const fbc = request.cookies.get("_fbc")?.value;

  if (userAgent) userData.client_user_agent = userAgent;
  if (clientIp) userData.client_ip_address = clientIp;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: getStringValue(body.eventId),
        event_source_url: getStringValue(body.sourceUrl),
        action_source: "website",
        user_data: userData,
        custom_data: body.customData || {},
      },
    ],
  };

  if (testEventCode) payload.test_event_code = testEventCode;

  const response = await fetch(
    `https://graph.facebook.com/${graphApiVersion}/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return Response.json(
      { ok: false, meta: result },
      { status: response.status }
    );
  }

  return Response.json({ ok: true, meta: result });
}
