import { notFound } from "next/navigation";

export default async function PastePage({ params }) {
  const res = await fetch(`/api/pastes/${params.id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return (
    <main style={{ padding: 40, whiteSpace: "pre-wrap" }}>
      {data.content}
    </main>
  );
}
