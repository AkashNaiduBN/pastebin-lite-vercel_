import { redis } from "@/lib/redis";
import { nowMs } from "@/lib/time";

export async function GET(req, { params }) {
  const key = `paste:${params.id}`;
  const data = await redis.hgetall(key);
  if (!data || !data.content) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = nowMs(req);
  const expiresAt = data.expiresAt ? Number(data.expiresAt) : null;
  const maxViews = data.maxViews ? Number(data.maxViews) : null;
  const views = Number(data.views || 0);

  if ((expiresAt && now >= expiresAt) || (maxViews && views >= maxViews)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  await redis.hincrby(key, "views", 1);

  return Response.json({
    content: data.content,
    remaining_views: maxViews ? Math.max(maxViews - views - 1, 0) : null,
    expires_at: expiresAt ? new Date(expiresAt).toISOString() : null
  });
}
