"use server"

import ProductModel from "@/db/models/ProductModel"
import { ObjectId } from "mongodb"

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

export async function GET() {
  try {
    const result: IProduct[] = await ProductModel.getRandomProducts()
    return Response.json(result, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}