"use client"

import { ObjectId } from "mongodb";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

  const deleteWishlist = async (productId: string) => {
    try {
      const url: string = process.env.NEXT_PUBLIC_API_URL + "/wishlist";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete wishlist item");
      }
      const result = await response.json();
      getWishlistProducts()
      Swal.fire({
        title: "Success",
        text: result.message,
        icon: "success",
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
      })
      console.error("Error deleting wishlist item:", error);      
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
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
              </Link>
            </figure>
            <div className="card-body">
              <Link href={`/products/${product.slug}`}>
                <h2 className="card-title hover:text-primary hover:underline">{product.name}</h2>
              </Link>
              {formatPrice(product.price)}
              <div className="card-actions justify-start">
                <Link className="btn btn-primary" href={`/products/${product.slug}`}>Detail product</Link>
                <button className="btn btn-error" onClick={() => deleteWishlist(product._id.toString())}>Remove</button>
              </div>
            </div>
          </div>
        )})}
      </main>
    </div>
  );
}
