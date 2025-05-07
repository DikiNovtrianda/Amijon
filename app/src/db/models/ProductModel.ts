import { ObjectId } from "mongodb"
import { getDB } from "../config/mongodb"
import { getWishlistOnProductAggWithSlug, getWishlistOnProductAggWithUId } from "../helpers/aggregation"

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

export default class ProductModel {
  static getCollection() {
    const db = getDB()
    return db.collection<IProduct>("products")
  }

  static async getPagedAggregatedProducts(userId: ObjectId | string, page: number = 1, search: string): Promise<IProductWithWishlist[]> {
    const products = this.getCollection()
    const limit = 20
    const skip = (page - 1) * limit
    const pipeline = [
      ...getWishlistOnProductAggWithUId(userId), 
      {
        $match: search
          ? { name: { $regex: search, $options: "i" } } 
          : {}, 
      },
      { $skip: skip },
      { $limit: limit },
    ];
    return await products.aggregate<IProductWithWishlist>(pipeline).toArray()
  }

  static async getRandomProducts(): Promise<IProduct[]> {
    const limit = 10
    const products = this.getCollection()
    return await products.aggregate<IProduct>([
      { $match: { $expr: { $gte: [ { $rand: {} }, 0.5 ] } } }, 
      { $sample: { size: limit } }
    ]).toArray()
  }

  static async getProductsByTag(tag: string = "Elektronik"): Promise<IProduct[]> {
    const products = this.getCollection()
    return await products.find({ tags: tag }).limit(4).toArray()
  }

  static async getProductBySlug(slug: string): Promise<IProductWithWishlist | null> {
    const products = this.getCollection()
    const pipeline = getWishlistOnProductAggWithSlug(slug)
    const data = await products.aggregate<IProductWithWishlist>(pipeline).toArray()
    return data.length > 0 ? data[0] : null
  }
}