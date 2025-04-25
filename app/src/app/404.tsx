"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function NotFoundPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "No query";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-4">You searched for: {query}</p>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundPage />
    </Suspense>
  );
}