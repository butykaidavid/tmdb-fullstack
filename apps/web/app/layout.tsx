import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>MovieDB - Your Ultimate Movie Database</title>
        <meta name="description" content="Discover movies, TV shows, and celebrities. Get ratings, reviews, and recommendations." />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
