import { notFound } from "next/navigation";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";

export default async function PastePage({ params }) {
  const key = `paste:${params.id}`;
  const data = await redis.hgetall(key);

  if (!data || !data.content) {
    notFound();
  }

  const now = Date.now();
  const expiresAt = data.expiresAt ? Number(data.expiresAt) : null;
  const maxViews = data.maxViews ? Number(data.maxViews) : null;
  const views = Number(data.views || 0);

  if ((expiresAt && now >= expiresAt) || (maxViews && views >= maxViews)) {
    notFound();
  }

  await redis.hincrby(key, "views", 1);

  return (
    <main style={{ padding: 40, whiteSpace: "pre-wrap" }}>
      {data.content}
    </main>
  );
}
