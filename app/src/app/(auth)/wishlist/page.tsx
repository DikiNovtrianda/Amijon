import Link from "next/link";

export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Apple iPad (9th Generation)",
      price: 33000000,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy Tab S7",
      price: 4999000,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 3,
      name: "Microsoft Surface Pro 7",
      price: 74999900,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 4,
      name: "Apple iPad (9th Generation)",
      price: 33000000,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 5,
      name: "Samsung Galaxy Tab S7",
      price: 4999000,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 6,
      name: "Microsoft Surface Pro 7",
      price: 74999900,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 7,
      name: "Apple iPad (9th Generation)",
      price: 33000000,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 8,
      name: "Samsung Galaxy Tab S7",
      price: 4999000,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 9,
      name: "Microsoft Surface Pro 7",
      price: 74999900,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
  ];

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
    <div className="min-h-screen bg-base-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Wishlist</h1>
        <p className="text-gray-600">Items you&apos;ve saved for later.</p>
      </header>
      <main className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
                {formatPrice(item.price)}
              <div className="card-actions justify-start">
                <Link className="btn btn-primary" href={`/products/${item.id}`}>Detail product</Link>
                <button className="btn btn-error">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
