import WishlistModel from "@/db/models/WishlistModel"
import { ObjectId } from "mongodb"
import { NextRequest } from "next/server"

interface IWishlist {
  userId: ObjectId
  productId: ObjectId
  createdAt: string
  updatedAt: string
}

export async function POST(request: NextRequest) {
  try {
	  const _id = request.headers.get("x-user-id");
    const userId = _id ? new ObjectId(_id) : ""
    const body: IWishlist = await request.json()
    const { productId } = body
    const message = WishlistModel.createWishlist({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return Response.json({ message }, { status: 201 })
  } catch (error) {
    console.log(error);
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const _id = request.headers.get("x-user-id");
    const userId = _id ? new ObjectId(_id) : ""
    const wishlist = await WishlistModel.getWishlistByUserId(new ObjectId(userId))
    return Response.json(wishlist, { status: 200 })
  } catch (error) {
    console.log(error);
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const _id = request.headers.get("x-user-id");
    const userId = _id ? new ObjectId(_id) : ""
    const { productId } = await request.json()
    const message = await WishlistModel.deleteUserWishlistByProductId(new ObjectId(userId), new ObjectId(productId))
    return Response.json({ message }, { status: 200 })
  } catch (error) {
    console.log(error);
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}

