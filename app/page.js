"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  async function submit() {
    setError(null);
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setUrl(data.url);
  }

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1>Pastebin Lite</h1>
      <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} style={{ width: "100%" }} />
      <div>
        <input placeholder="TTL seconds" value={ttl} onChange={e => setTtl(e.target.value)} />
        <input placeholder="Max views" value={views} onChange={e => setViews(e.target.value)} />
      </div>
      <button onClick={submit}>Create Paste</button>
      {url && <p>Share URL: <a href={url}>{url}</a></p>}
      {error && <p>{error}</p>}
    </main>
  );
}
