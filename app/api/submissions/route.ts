import { submissionSchema } from "@/lib/resources/schema";
import { createPendingResource, findByNormalizedUrl } from "@/lib/resources/repository";
import { acceptSubmission } from "@/lib/submissions/rate-limit";

export async function POST(request: Request) {
  const key = request.headers.get("cf-connecting-ip") ?? "anonymous";
  if (!acceptSubmission(key)) return Response.json({ ok: false, code: "RATE_LIMITED" }, { status: 429 });
  let json: unknown; try { json = await request.json(); } catch { return Response.json({ ok: false, code: "INVALID_JSON" }, { status: 400 }); }
  const parsed = submissionSchema.safeParse(json);
  if (!parsed.success) return Response.json({ ok: false, code: "VALIDATION_ERROR", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  try { if (await findByNormalizedUrl(parsed.data.url)) return Response.json({ ok: false, code: "DUPLICATE_URL" }, { status: 409 }); const resource = await createPendingResource(parsed.data); return Response.json({ ok: true, id: resource.id }, { status: 201 }); }
  catch { return Response.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 }); }
}
