import { ObjectId } from "mongodb"
import { getDB } from "../config/mongodb"
import { getProductOnWIshlistAgg } from "../helpers/aggregation"

interface IWishlist {
  userId: ObjectId
  productId: ObjectId
  createdAt: string
  updatedAt: string
}

export default class WishlistModel {
  static getCollection() {
    const db = getDB()
    return db.collection<IWishlist>("wishlists")
  }

  static async createWishlist(payload: IWishlist) {
    const collection = this.getCollection()
    await collection.insertOne(payload)
    return "Success create wishlist"
  }

  static async getWishlistByUserId(userId: ObjectId) {
    const collection = this.getCollection()
    const wishlist = await collection.aggregate(getProductOnWIshlistAgg(userId)).toArray()
    return wishlist
  }

  static async deleteUserWishlistByProductId(userId: ObjectId, productId: ObjectId) {
    const collection = this.getCollection()
    const result = await collection.deleteOne({ userId, productId })
    return result.deletedCount > 0 ? "Success delete wishlist" : "Failed to delete wishlist"
  }
}