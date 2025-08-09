export async function api<T>(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
  const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("API error");
  return (await res.json()) as T;
}
