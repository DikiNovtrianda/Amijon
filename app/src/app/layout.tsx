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
        <header className="navbar bg-base-100 shadow-md bg-neutral">
          <div className="flex-1 text-center">
            <Link href="/" className="normal-case text-xl text-white">
              Amijon
            </Link>
          </div>
          <div className="flex-4">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search Amijon"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex-1 ml-auto">
            <ul className="menu menu-horizontal px-1 w-full text-white">
              <li className="flex-1 items-center">
                <Link href="/products">Products</Link>
              </li>
              <li className="flex-1 items-center">
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li className="flex-1 items-center">
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
