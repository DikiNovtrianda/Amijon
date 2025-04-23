import ProductModel from "@/db/models/ProductModel"
import { ObjectId } from "mongodb"
import { NextRequest } from "next/server"

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await ProductModel.getProductBySlug(slug)
  return Response.json( product, { status: 200 })
}