import { ObjectId } from "mongodb"
import Link from "next/link"

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

export default async function Home() {

  const getFeaturedProducts = async (tag: string): Promise<IProduct[]> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/featured?tag=${encodeURIComponent(tag)}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch featured products");
      const data: IProduct[] = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return []
    }
  }

  const getRandomProducts =  async (): Promise<IProduct[] | undefined> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/randomizer`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch featured products");
      const data: IProduct[] = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const formatPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    const hundreds = price % 1000;
    return (
      <p className="text-lg flex items-start gap-1">
        <span>Rp</span><span className="text-3xl font-semibold">{thousands.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><span>{hundreds.toString().padStart(3, "0")}</span>
      </p>
    );
  };

  const mainTags = ["Elektronik", "Furnitur", "Webcam", "Penyimpanan Data"]
  const featuredProducts: IProduct[][] = await Promise.all(
    mainTags.map((tag) => getFeaturedProducts(tag))
  );
  const randomProducts = await getRandomProducts()
  if (!randomProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto">
        <div 
          className="p-8"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(248, 248, 248, 255) 80%), 
              url('https://m.media-amazon.com/images/I/61A-FJoXloL._SX3000_.jpg')
            `,
            backgroundSize: "cover", 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", 
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-60">
            {featuredProducts.map((products, index) => {
              return (
                <div key={index} className="card bg-white shadow-md">
                  <div className="card-body">
                    <h2 className="card-title">{mainTags[index]}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {products.map((product) => {
                        return (
                          <Link key={product._id.toString()} href={`/products/${product.slug}`}>
                            <div className="card bg-base-100 shadow-md bg-white">
                              <figure>
                                <img
                                  src={product.thumbnail}
                                  alt={product.name}
                                  className="w-full h-30 object-contain"
                                />
                              </figure>
                              <div className="card-body p-0 h-20">
                                <h2 className="card-title text-xs p-2">{product.name}</h2>
                              </div>
                            </div>
                          </Link>
                        )}
                      )}
                    </div>
                  </div>
                </div>
              )}
            )}
          </div>
        </div>
        <div className="card bg-white mt-6">
          <div className="card-body">
            <h2 className="card-title">Check out our products</h2>
            <div 
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto"
              style={{
                display: "flex",
                overflowX: "auto",
                paddingBottom: "1rem",
              }}
            >
              {randomProducts.map((product) => (
                <div
                key={product._id.toString()}
                >
                  <div
                    className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow w-80 h-140"
                  >
                    <figure className="bg-white">
                      <Link href={`/products/${product.slug}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-80 object-cover"
                        />
                      </Link>
                    </figure>
                    <div className="card-body">
                      <Link href={`/products/${product.slug}`} className="hover:underline hover:text-warning">
                        <h2 className="card-title">{product.name}</h2>
                      </Link>
                      {formatPrice(product.price)}
                      <div className="card-actions ">
                        <Link className="btn btn-primary" href={`/products/${product.slug}`}>See product</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Link href={`/products`} className="flex">
                <div className="card flex bg-base-100 shadow-md flex-shrink-0 w-80 h-140 text-lg font-semibold ">
                  <p className="text-center hover:text-primary pt-58 text-xl">Click here to <br />see more products</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral text-white mt-8">
        <div className="container mx-auto py-8">
          <div className="my-15 text-center">
            <h1 className="text-2xl mb-5">About us</h1>
            <h2 className="text-xl">Although our business hasnt yet to finish, one constant is customers desire for wishlisting items. Today, Amijon shoppers can find what theyre looking for online. From wishlisting products to their devices to not creating and distributing things, we are always finding new ways to disappoint our customers.</h2>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm">
                © 2025, amijon.com, Inc. or its affiliates
              </div>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <p className="hover:underline">Diki Novtrianda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
