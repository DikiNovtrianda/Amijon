import Link from "next/link";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 2,
      name: "Product 2",
      price: 1000000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 3,
      name: "Product 3",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 4,
      name: "Product 4",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 5,
      name: "Product 5",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 6,
      name: "Product 6",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 7,
      name: "Product 7",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 8,
      name: "Product 8",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 9,
      name: "Product 9",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 10,
      name: "Product 10",
      price: 100000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
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
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-1/6 p-4">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="menu rounded-box">
          <li>
            <a href="#" className="hover:bg-primary hover:text-white">
              Category 1
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary hover:text-white">
              Category 2
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary hover:text-white">
              Category 3
            </a>
          </li>
        </ul>
      </aside>

      <main className="flex-grow p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Product list</h1>
          <p className="text-sm text-gray-500">
            Check each product page for other buying options.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                  {formatPrice(product.price)}
                <div className="card-actions ">
                <Link className="btn btn-primary" href={`/products/${product.id}`}>See product</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
