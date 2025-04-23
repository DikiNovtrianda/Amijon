import { ObjectId } from "mongodb"
import { getDB } from "../config/mongodb"

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

export default class ProductModel {
  static getCollection() {
    const db = getDB()
    return db.collection<IProduct>("products")
  }

  static async getAllProducts(): Promise<IProduct[]> {
    const products = this.getCollection()
    return await products.find().toArray()
  }

  static async getPagedProducts(page: number): Promise<IProduct[]> {
    const products = this.getCollection()
    const skip = (page - 1) * 10
    return await products.find().skip(skip).limit(10).toArray()
  }

  static async getProductBySlug(slug: string): Promise<IProduct | null> {
    const products = this.getCollection()
    return await products.findOne({ slug })
  }
}