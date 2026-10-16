import { eq } from "drizzle-orm";
import { stripeCustomers, subscriptions, payments, InsertStripeCustomer, InsertSubscription, InsertPayment } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Get or create a Stripe customer record for a user
 */
export async function getOrCreateStripeCustomer(userId: number, stripeCustomerId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const newCustomer: InsertStripeCustomer = {
    userId,
    stripeCustomerId,
  };

  await db.insert(stripeCustomers).values(newCustomer);

  const created = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  return created[0];
}

/**
 * Get Stripe customer ID for a user
 */
export async function getStripeCustomerId(userId: number): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0].stripeCustomerId : null;
}

/**
 * Create or update a subscription record
 */
export async function upsertSubscription(data: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(subscriptions)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        status: data.status,
        updatedAt: new Date(),
      },
    });
}

/**
 * Get active subscription for a user
 */
export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Record a payment
 */
export async function createPayment(data: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(payments).values(data);
}

/**
 * Get payment history for a user
 */
export async function getUserPayments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(payments.createdAt);
}
