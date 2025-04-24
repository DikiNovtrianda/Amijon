import { ObjectId } from "mongodb";

export const getWishlistOnProductAgg = (userId: string | ObjectId) => {
  return [
    {
      $lookup: {
        from: 'wishlists',
        localField: '_id',
        foreignField: 'productId',
        pipeline: [
          {
            $match: {
              userId: userId
            }
          }
        ],
        as: 'wishlist'
      }
    },
    {
      $unwind: {
        path: '$wishlist',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        isWishlist: {
          $cond: [
            { $ifNull: ['$wishlist._id', false] },
            true,
            false
          ]
        }
      }
    },
    { $project: { wishlist: 0 } }
  ]
}