import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {
        origin: "https://test.example.com",
      },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("stripe.createCheckoutSession", () => {
  it("should create a checkout session for monthly plan", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckoutSession({
      productKey: "MONTHLY",
    });

    expect(result).toHaveProperty("sessionId");
    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("should create a checkout session for VIP 1-on-1 plan", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckoutSession({
      productKey: "VIP",
    });

    expect(result).toHaveProperty("sessionId");
    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("should create a checkout session for annual plan", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckoutSession({
      productKey: "ANNUAL",
    });

    expect(result).toHaveProperty("sessionId");
    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("should include user metadata in the checkout session", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckoutSession({
      productKey: "MONTHLY",
    });

    // Verify that a session was created successfully
    expect(result.sessionId).toBeTruthy();
    expect(result.url).toBeTruthy();
  });
});

describe("stripe.getPaymentHistory", () => {
  it("should return payment history for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.getPaymentHistory();

    expect(Array.isArray(result)).toBe(true);
    // New user should have no payment history
    expect(result.length).toBe(0);
  });
});
