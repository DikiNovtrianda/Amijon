"use client";

import { Suspense, useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import SearchBar from "@/components/searchBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    setIsLoggedIn(!!cookies["access_token"]);
  }, [])

  const handleLogout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/;"
    setIsLoggedIn(false)
    router.push("/login")
  }

  return (
    <html lang="en" data-theme="bumblebee">
      <body>
        <header className="navbar bg-base-100 shadow-md bg-neutral">
          <div className="flex-1 flex">
            <Link href="/" className="items-center mx-auto">
              <Image src="/amijon_w.png" alt="Amijon Logo" width={100} height={40} />
            </Link>
          </div>
          <div className="flex-4">
            <Suspense fallback={<div>Loading search...</div>}>
              <SearchBar />
            </Suspense>
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
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="text-white hover:underline">
                    Log out
                  </button>
                ) : (
                  <Link href="/login" className="text-white hover:underline">
                    Log in
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}