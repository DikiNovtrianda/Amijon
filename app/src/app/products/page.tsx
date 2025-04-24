"use client"

import { ObjectId } from "mongodb";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProduct {
  _id: ObjectId
  name: string
  slug: string
  description: string
  excerpt: string
  price: number
  tags: string[]
  thumbnail: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || ""

  const fetchProducts = async () => {
    try {
      const url: string = process.env.NEXT_PUBLIC_API_URL + "/products"
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageNumber: 1, search: "" }),
      })
  
      if (!resp.ok) {
        return { error: true, message: "Failed to fetch products" };
      }
      const data: IProduct[] = await resp.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const formatPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    const hundreds = price % 1000;
    return (
      <p className="text-lg flex items-start gap-1">
        <span>Rp</span>
        <span className="text-3xl font-semibold">{thousands.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        <span>{hundreds.toString().padStart(3, "0")}</span>
      </p>
    );
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  if (products.length === 0) {
    return <p className="text-center">No products found</p>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="menu rounded-box">
          <li>
            <a href="#" className="hover:bg-primary hover:text-white">
              Category 1
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary hover:text-white">
              Category 2
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary hover:text-white">
              Category 3
            </a>
          </li>
        </ul>
      </aside>

      <main className="flex-grow p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Product list</h1>
          <p className="text-sm text-gray-500">
            Check each product page for other buying options.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id.toString()}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <figure className="bg-white">
                <Link href={`/products/${product.slug}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                </Link>
              </figure>
              <div className="card-body">
                <Link href={`/products/${product.slug}`} className="hover:underline hover:text-warning">
                <h2 className="card-title">{product.name}</h2>
                </Link>
                {formatPrice(product.price)}
                <div className="card-actions ">
                <Link className="btn btn-primary" href={`/products/${product.slug}`}>See product</Link>
                {/* call wishlist post later on */}
                <Link className="btn btn-neutral" href={`/products/${product.slug}`}>Wishlist</Link>
                {/* <Link className="btn btn-accent" href={`/products/${product.slug}`}>Wishlisted</Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
