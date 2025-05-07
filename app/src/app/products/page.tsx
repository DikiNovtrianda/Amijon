"use client";

import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function Products() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}