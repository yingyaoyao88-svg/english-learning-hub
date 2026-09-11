import { listPublishedResources } from "@/lib/resources/repository";
export async function GET() { try { return Response.json({ resources: await listPublishedResources() }); } catch { return Response.json({ resources: [] }); } }
