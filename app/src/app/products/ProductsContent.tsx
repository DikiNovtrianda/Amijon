"use client";

import { ObjectId } from "mongodb";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";
import { actWishlist } from "./action";

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

interface IResponse {
  error: boolean;
  message: string;
}

export default function ProductsContent() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const fetchProducts = async (page: number) => {
    try {
      setError(null);
      const url: string =
        process.env.NEXT_PUBLIC_API_URL +`/products?pageNumber=${page}&search=${encodeURIComponent(search)}`;
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        setError("Failed to fetch products. Please try again later.");
        setHasMore(false);
        return;
      }
      const data: IProduct[] = await resp.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => {
          const existingIds = new Set(
            prevProducts.map((product) => product._id.toString())
          );
          const uniqueProducts = data.filter(
            (product) => !existingIds.has(product._id.toString())
          );
          return [...prevProducts, ...uniqueProducts];
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  const formatPrice = (price: number) => {
    const thousands: number = Math.floor(price / 1000);
    const hundreds: number = price % 1000;
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

  const addWishlist = async (productId: string) => {
    try {
      const resp: IResponse = await actWishlist(productId);
      if (resp.error) {
        Swal.fire({
          title: "Error",
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Wishlist added",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product._id.toString() === productId) {
            return { ...product, isWishlist: true };
          }
          return product;
        });
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const showWishlistButton = (product: IProduct) => {
    if (!product.isWishlist) {
      return (
        <button
          className="btn btn-neutral"
          onClick={() => addWishlist(product._id.toString())}
        >
          Wishlist
        </button>
      );
    } else {
      return <button className="btn btn-accent">Wishlisted</button>;
    }
  };

  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    setHasMore(true);
    fetchProducts(1);
  }, [search]);

  const fetchMoreData = () => {
    const nextPage: number = pageNumber + 1;
    setPageNumber(nextPage);
    fetchProducts(nextPage);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Products not found!</p>
      </div>
    );
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
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="mt-5">Loading...</h4>}
          endMessage={
            <p className="text-center mt-5">No more products to show</p>
          }
        >
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
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:underline hover:text-warning"
                  >
                    <h2 className="card-title">{product.name}</h2>
                  </Link>
                  {formatPrice(product.price)}
                  <div className="card-actions ">
                    <Link
                      className="btn btn-primary"
                      href={`/products/${product.slug}`}
                    >
                      See product
                    </Link>
                    {showWishlistButton(product)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
}