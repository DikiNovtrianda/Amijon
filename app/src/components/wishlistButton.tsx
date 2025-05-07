"use client"

import { actWishlist } from "@/app/products/action";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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
  isWishlist: boolean
}

export default function WishlistButton({ product }: { product: IProduct }) {
  const router = useRouter()
  const addWishlist = async (productId: string) => {
    try {
      const resp = await actWishlist(productId);
      if (resp.error) {
        Swal.fire({
          title: "Error",
          icon: "error",
        });
        return;
      }
      if (resp.error) {
        Swal.fire({
          title: "Error",
          text: resp.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Wishlist added",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      router.push(window.location.pathname)
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  if (!product.isWishlist) {
    return (
      <button
        className="btn btn-neutral w-full text-base normal-case rounded-md shadow-md"
        onClick={() => addWishlist(product._id.toString())}
      >
        Wishlist
      </button>
    );
  } else {
    return (
      <button className="btn btn-accent w-full text-base normal-case rounded-md shadow-md">
        Wishlisted
      </button>
    )
  }

}