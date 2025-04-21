export default function Products() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$19.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$29.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$39.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$49.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$59.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$69.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$79.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$89.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 9,
      name: "Product 9",
      price: "$99.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
    {
      id: 10,
      name: "Product 10",
      price: "$109.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zfLpWHVzBy9Hx-SCgYbFxu0BpKkE2TcYSw&s",
    },
  ];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow-md flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-bold mb-2 text-gray-700">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.price}</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
