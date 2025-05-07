"use server"

import WishlistButton from "@/components/wishlistButton";
import { ObjectId } from "mongodb";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IProduct {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isWishlist: boolean;
}

export async function generateMetadata({params}: { params: Promise<{ slug: string }>}): Promise<Metadata> {
  const { slug } = await params;
  const url = process.env.NEXT_PUBLIC_API_URL + "/products/" + slug
  const resp = await fetch(url, {
    method: "GET",
  })
  const product: IProduct = await resp.json()
  return {
    title: product.name,
    description: product.excerpt,
    openGraph:{
      images:product.images
    }
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const fetchProduct = async (slug: string): Promise<IProduct | null> => {
    try {
      const url: string = process.env.NEXT_PUBLIC_API_URL + "/products/" + slug;
      const resp = await fetch(url, {
        method: "GET",
      });
      if (resp.status === 404) {
        return null;
      }
      if (!resp.ok) {
        throw new Error("Failed to fetch product");
      }
      const product: IProduct = await resp.json();     
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };
  
  const formatPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    const hundreds = price % 1000;
    return (
      <p className="text-lg flex items-start gap-1">
        <span>Rp</span>
        <span className="text-3xl font-semibold">
          {thousands.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
        <span>{hundreds.toString().padStart(3, "0")}</span>
      </p>
    );
  };

  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) {
    notFound(); 
  }

  return (
    <div className="container mx-auto px-10 py-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <img
            src={product.thumbnail}
            alt={product.name}
            className="object-contain mx-auto border-3 md:order-1 border-gray-300 rounded-lg"
          />
          <div className="flex flex-row gap-2 mb-8 mt-4 md:order-2 items-center overflow-x-auto scrollbar-hide">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.name}
                className="object-contain h-30 mx-auto border-3 md:order-1 border-gray-300 rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col p-5 pt-8">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">
            {product.name}
          </h1>
          {formatPrice(product.price)}
          <p className="text-sm text-gray-800 mt-3 mb-6">{product.description}</p>
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-md font-semibold">Tags :</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge badge-primary text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <WishlistButton product={product} />
        </div>
      </div>
    </div>
  );
}
