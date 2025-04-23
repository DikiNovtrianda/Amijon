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

export async function GET(request: NextRequest) {
  try {
    const result: IProduct[] = await ProductModel.getAllProducts()
    return Response.json(result, { status: 200 })
  } catch (error) {
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}
