import ProductModel from "@/db/models/ProductModel"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await ProductModel.getProductBySlug(slug)
  return Response.json( product, { status: 200 })
}