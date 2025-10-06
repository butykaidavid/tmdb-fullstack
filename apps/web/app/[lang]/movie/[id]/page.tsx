import { redirect } from 'next/navigation'

export default function LangMoviePage({ params }: { params: { id: string, lang: string }}) {
  redirect(`/movie/${params.id}`)
}
