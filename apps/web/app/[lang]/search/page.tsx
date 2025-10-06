import { redirect } from 'next/navigation'

export default function LangSearchPage({ searchParams }: any) {
  const q = searchParams?.q || ""
  redirect(`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`)
}
