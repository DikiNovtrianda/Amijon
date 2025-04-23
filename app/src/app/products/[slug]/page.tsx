"use server"

import { ObjectId } from "mongodb";

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
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const fetchProduct = async (slug: string): Promise<IProduct> => {
    try {
      const url: string = process.env.NEXT_PUBLIC_API_URL + "/products/" + slug;
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Failed to fetch product");
      }
      const product: IProduct = await resp.json();      
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
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

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <img
            src={product.thumbnail}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain mx-auto"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">
            {product.name}
          </h1>
          {formatPrice(product.price)}
          <p className="text-sm text-gray-800 mt-3 mb-6">{product.description}</p>
          <button className="btn btn-accent w-full text-base normal-case rounded-md shadow-md">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
