"use client"

import { ObjectId } from "mongodb";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IWishlist {
  userId: ObjectId
  productId: ObjectId
  createdAt: string
  updatedAt: string
  product: IProduct
}

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


export default function Wishlist() {
  const [wishlists, setWishlists] = useState<IWishlist[]>([]);

  const getWishlistProducts = async () => {
    try {
      const url: string = process.env.NEXT_PUBLIC_API_URL + "/wishlist";
	    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items");
      }
      const data = await response.json();
      setWishlists(data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  }

  const formatPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    const hundreds = price % 1000;
    return (
      <p className="text-lg flex items-start gap-1">
        <span>Rp</span><span className="text-3xl font-semibold">{thousands.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><span>{hundreds.toString().padStart(3, "0")}</span>
      </p>
    );
  };

  useEffect(() => {
    getWishlistProducts()
  }, []);

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Wishlist</h1>
        <p className="text-gray-600">Items you&apos;ve saved for later.</p>
      </header>
      <main className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {wishlists.map((wishlist) => {
          const product = wishlist.product
          return (
          <div key={product._id.toString()} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-60 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
                {formatPrice(product.price)}
              <div className="card-actions justify-start">
                <Link className="btn btn-primary" href={`/products/${product._id}`}>Detail product</Link>
                <button className="btn btn-error">Remove</button>
              </div>
            </div>
          </div>
        )})}
      </main>
    </div>
  );
}
