import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { resources } from "@/db/schema";
import type { Resource, ReviewStatus } from "./types";
import type { ValidSubmission } from "./schema";

const asResource = (row: typeof resources.$inferSelect) => row as Resource;
export async function listPublishedResources() { return (await getDb().select().from(resources).where(eq(resources.status, "published")).orderBy(desc(resources.publishedAt))).map(asResource); }
export async function listResources(status?: ReviewStatus) { const query = getDb().select().from(resources); return (status ? await query.where(eq(resources.status, status)) : await query).map(asResource); }
export async function findByNormalizedUrl(url: string) { const [row] = await getDb().select().from(resources).where(eq(resources.normalizedUrl, url)).limit(1); return row ? asResource(row) : null; }
export async function createPendingResource(input: ValidSubmission) { const now = new Date().toISOString(); const [row] = await getDb().insert(resources).values({ ...input, normalizedUrl: input.url, id: crypto.randomUUID(), status: "pending", createdAt: now, updatedAt: now }).returning(); return asResource(row); }
export async function updateResource(id: string, status: ReviewStatus, patch: Partial<ValidSubmission> = {}) { const now = new Date().toISOString(); const [row] = await getDb().update(resources).set({ ...patch, normalizedUrl: patch.url, status, updatedAt: now, publishedAt: status === "published" ? now : null }).where(eq(resources.id, id)).returning(); return row ? asResource(row) : null; }
