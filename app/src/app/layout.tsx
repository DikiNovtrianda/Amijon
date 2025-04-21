import "./globals.css";
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Link href="/">/beranda </Link>
          <Link href="/login">/login </Link>
          <Link href="/register">/register </Link>
          <Link href="/products">/products </Link>
          <Link href="/wishlist">/wishlist </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
