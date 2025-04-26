"use client";

import { Suspense } from "react";
import "./globals.css";
import Link from "next/link";
import SearchBar from "@/components/searchBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                <Link href="/login">Log in</Link>
              </li>
            </ul>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}