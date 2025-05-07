"use server"

import ProductModel from "@/db/models/ProductModel";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

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

interface IProductWithWishlist extends IProduct {
  isWishlisted: boolean
}

export async function GET(request: NextRequest) {
  try {
	  const _id = request.headers.get("x-user-id");
    const userId = _id ? new ObjectId(_id) : ""
    const { searchParams } = request.nextUrl
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10)
    const search = searchParams.get("search") || ""
    const result: IProductWithWishlist[] = await ProductModel.getPagedAggregatedProducts(userId, pageNumber, search)
    if (result.length === 0) {
      return Response.json({ message: "No products found" }, { status: 404 })
    }
    return Response.json(result, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}
