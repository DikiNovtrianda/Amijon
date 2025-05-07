import { ObjectId } from "mongodb";

export const getWishlistOnProductAggWithSlug = (slug: string) => {
  return [
    {
      $match: {
        slug
      }
    },
    {
      $lookup: {
        from: 'wishlists',
        localField: '_id',
        foreignField: 'productId',
        as: 'wishlist'
      }
    },
    ...getWishlistOnProductAgg()
  ]
}

export const getWishlistOnProductAggWithUId = (userId: string | ObjectId) => {
  return [
    {
      $lookup: {
        from: 'wishlists',
        localField: '_id',
        foreignField: 'productId',
        pipeline: [
          {
            $match: {
              userId
            }
          }
        ],
        as: 'wishlist'
      }
    },
    ...getWishlistOnProductAgg()
  ]
}

export const getWishlistOnProductAgg = () => {
  return [
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

export const getProductOnWIshlistAgg = (userId: string | ObjectId) => {
  return [
    {
      $match: {
        userId
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: { path: '$product' } }
  ]
}