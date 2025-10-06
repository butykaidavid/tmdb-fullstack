import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <Header lang={params.lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={params.lang} />
    </>
  );
}
