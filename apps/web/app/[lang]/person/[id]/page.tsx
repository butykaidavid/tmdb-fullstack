import { redirect } from 'next/navigation'

export default function LangPersonPage({ params }: { params: { id: string, lang: string }}) {
  redirect(`/person/${params.id}`)
}
