import "./globals.css";
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body>
        <header className="navbar bg-base-100 shadow-md">
          <div className="flex-1 text-center">
            <Link href="/" className="normal-case text-xl">
              Amijon
            </Link>
          </div>
          <div className="flex-3">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search Amijon"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex-1 ml-auto">
            <ul className="menu menu-horizontal px-1 w-full">
              <li className="flex-1">
                <Link href="/products">Products</Link>
              </li>
              <li className="flex-1">
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li className="flex-1">
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
