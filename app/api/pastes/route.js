import { nanoid } from "nanoid";
import { redis } from "@/lib/redis";
import { nowMs } from "@/lib/time";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { content, ttl_seconds, max_views } = body;

  if (typeof content !== "string" || content.trim().length === 0) {
    return Response.json({ error: "content required" }, { status: 400 });
  }

  if (ttl_seconds !== undefined) {
    if (!Number.isInteger(ttl_seconds) || ttl_seconds < 1) {
      return Response.json({ error: "invalid ttl_seconds" }, { status: 400 });
    }
  }

  if (max_views !== undefined) {
    if (!Number.isInteger(max_views) || max_views < 1) {
      return Response.json({ error: "invalid max_views" }, { status: 400 });
    }
  }

  const id = nanoid(10);
  const createdAt = nowMs(req);
  const expiresAt = ttl_seconds ? createdAt + ttl_seconds * 1000 : null;

  await redis.hset(`paste:${id}`, {
    content,
    createdAt,
    expiresAt: expiresAt ?? "",
    maxViews: max_views ?? "",
    views: 0
  });

  return Response.json({
    id,
    url: `/p/${id}`
  });
}
