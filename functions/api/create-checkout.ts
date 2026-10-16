const PRODUCTS: Record<string, { name: string; amount: number }> = {
  MONTHLY: { name: "Snipe Signals — Monthly", amount: 4999 },
  ANNUAL: { name: "Snipe Signals — Annual (25% off)", amount: 44991 },
  VIP: { name: "Snipe Signals — VIP 1-on-1", amount: 24999 },
};

export const onRequestPost: PagesFunction<{ STRIPE_SECRET_KEY: string }> = async ({ request, env }) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const key = env.STRIPE_SECRET_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: "Stripe is not configured" }), { status: 503, headers: cors });
  }

  let productKey = "";
  try {
    const body = (await request.json()) as { productKey?: string };
    productKey = body.productKey || "";
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: cors });
  }

  const product = PRODUCTS[productKey];
  if (!product) {
    return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400, headers: cors });
  }

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${origin}/?payment=success`);
  params.set("cancel_url", `${origin}/?payment=cancelled`);
  params.set("allow_promotion_codes", "true");
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", String(product.amount));
  params.set("line_items[0][price_data][product_data][name]", product.name);
  params.set("metadata[product_id]", productKey);

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const session = (await stripeRes.json()) as { url?: string; error?: { message?: string } };
  if (!stripeRes.ok || !session.url) {
    return new Response(
      JSON.stringify({ error: session.error?.message || "Stripe checkout failed" }),
      { status: 502, headers: cors }
    );
  }

  return new Response(JSON.stringify({ url: session.url }), { status: 200, headers: cors });
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
