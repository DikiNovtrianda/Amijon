import { ObjectId } from "mongodb"
import { getDB } from "../config/mongodb"


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
    return "Success"
  }
}