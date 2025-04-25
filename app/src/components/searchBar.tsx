"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search)}`);
    } else {
      router.push(`/products`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/products?search=${encodeURIComponent(debouncedSearch)}`);
    } else {
      router.push(`/products`);
    }
  }, [debouncedSearch, router]);

  useEffect(() => {
    const query = searchParams.get("search") || "";
    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  return (
    <form className="form-control" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Amijon"
        className="input input-bordered w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}