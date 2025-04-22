// import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = {
    id: slug,
    name: "Apple iPad (9th Generation)",
    price: 99999900,
    description:
      "The Apple iPad (9th Generation) features a 10.2-inch Retina display, A13 Bionic chip, and support for Apple Pencil and Smart Keyboard.",
    image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
  };

  const formatPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    const hundreds = price % 1000;
    return (
      <p className="text-lg flex items-start gap-1">
        <span>Rp</span><span className="text-3xl font-semibold">{thousands.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><span>{hundreds.toString().padStart(3, "0")}</span>
      </p>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="">
          <img
            src={product.image}
            alt="SanDisk 128GB Extreme microSDXC"
            width={500}
            height={500}
            className="object-contain mx-auto"
          />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">
            {product.name}
          </h1>
          {formatPrice(product.price)}
          <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1 mb-6 mt-3">
            {product.description}
          </ul>

          <button className="btn btn-accent w-full text-base normal-case rounded-md shadow-md">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
