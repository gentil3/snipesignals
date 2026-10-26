import { decideInbound, type InboundJudgments } from "../../shared/typesafe/decide";
import { INBOUND_QUESTIONS, TYPESAFE_MODEL, type NamedPlan } from "../../shared/typesafe/questions";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

type SystemOneResponse = {
  answers?: {
    wants_to_pay?: { noul?: number };
    wants_partnering?: { noul?: number };
    is_support?: { noul?: number };
    named_plan?: { choice?: NamedPlan };
  };
  error?: { message?: string };
};

export const onRequestPost: PagesFunction<{ TYPESAFE_API_KEY: string }> = async ({ request, env }) => {
  const key = env.TYPESAFE_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: "TypeSafe is not configured" }), { status: 503, headers: cors });
  }

  let message = "";
  try {
    const body = (await request.json()) as { message?: string };
    message = (body.message || "").trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: cors });
  }

  if (!message) {
    return new Response(JSON.stringify({ error: "message required" }), { status: 400, headers: cors });
  }

  const tsRes = await fetch("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TYPESAFE_MODEL,
      state: { message },
      questions: INBOUND_QUESTIONS,
    }),
  });

  const payload = (await tsRes.json()) as SystemOneResponse;
  if (!tsRes.ok || !payload.answers) {
    return new Response(
      JSON.stringify({ error: payload.error?.message || "TypeSafe request failed" }),
      { status: 502, headers: cors }
    );
  }

  const judgments: InboundJudgments = {
    wants_to_pay: payload.answers.wants_to_pay?.noul ?? 0.5,
    wants_partnering: payload.answers.wants_partnering?.noul ?? 0.5,
    is_support: payload.answers.is_support?.noul ?? 0.5,
    named_plan: payload.answers.named_plan?.choice ?? "unspecified",
  };

  return new Response(JSON.stringify({ judgments, decision: decideInbound(judgments) }), {
    status: 200,
    headers: cors,
  });
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
