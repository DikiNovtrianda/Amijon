export default function Home() {
  const featuredItems = [
    {
      id: 1,
      name: "Apple iPad (9th Generation)",
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy Tab S7",
      image: "https://radarlambar.bacakoran.co/upload/9ba773bc83607854c3cf7d3f5a0f60c0.jpeg",
    },
    {
      id: 3,
      name: "Microsoft Surface Pro 7",
      image: "https://radarlambar.bacakoran.co/upload/9ba773bc83607854c3cf7d3f5a0f60c0.jpeg",
    },
    {
      id: 4,
      name: "Microsoft Surface Pro 7",
      image: "https://radarlambar.bacakoran.co/upload/9ba773bc83607854c3cf7d3f5a0f60c0.jpeg",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Apple iPad (9th Generation)",
      price: 3299999,
      image: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_UL320_.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy Tab S7",
      price: 4999000,
      image: "https://m.media-amazon.com/images/I/81Mf3EC3wUL._AC_UL320_.jpg",
    },
    {
      id: 3,
      name: "Microsoft Surface Pro 7",
      price: 7499999,
      image: "https://m.media-amazon.com/images/I/71QmFalQpZL._AC_UL320_.jpg",
    },
    {
      id: 4,
      name: "Lenovo Tab M10 Plus",
      price: 1999000,
      image: "https://m.media-amazon.com/images/I/71nMzhO05jL._AC_UL320_.jpg",
    },
    {
      id: 5,
      name: "Amazon Fire HD 10",
      price: 1499000,
      image: "https://m.media-amazon.com/images/I/61tE7IcuLmL._AC_UL320_.jpg",
    },
    {
      id: 6,
      name: "Apple MacBook Air",
      price: 9999999,
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
    },
    {
      id: 7,
      name: "Dell XPS 13",
      price: 10999999,
      image: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UL320_.jpg",
    },
    {
      id: 8,
      name: "HP Spectre x360",
      price: 12999999,
      image: "https://m.media-amazon.com/images/I/71y6r3v5VUL._AC_UL320_.jpg",
    },
    {
      id: 9,
      name: "Asus ROG Zephyrus G14",
      price: 14999999,
      image: "https://m.media-amazon.com/images/I/81vkgZzJd-L._AC_UL320_.jpg",
    },
    {
      id: 10,
      name: "Microsoft Surface Laptop 4",
      price: 12999999,
      image: "https://m.media-amazon.com/images/I/71zFI5QhJ2L._AC_UL320_.jpg",
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
    <div className="min-h-screen bg-base-100">
      {/* Product Grid */}
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
            {/* featured products */}
            <div className="card bg-white shadow-md">
              <div className="card-body">
                <h2 className="card-title">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredItems.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-md bg-white">
                      <figure>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-30 object-contain"
                        />
                      </figure>
                      <div className="card-body p-0">
                        <h2 className="card-title text-xs p-0">{item.name}</h2>
                      </div>
                    </div>
                  ))}
                  </div>
              </div>
            </div>
            {/* featured products */}
            <div className="card bg-white shadow-md">
              <div className="card-body">
                <h2 className="card-title">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredItems.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-md bg-white">
                      <figure>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-30 object-contain"
                        />
                      </figure>
                      <div className="card-body p-0">
                        <h2 className="card-title text-xs p-0">{item.name}</h2>
                      </div>
                    </div>
                  ))}
                  </div>
              </div>
            </div>
            {/* featured products */}
            <div className="card bg-white shadow-md">
              <div className="card-body">
                <h2 className="card-title">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredItems.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-md bg-white">
                      <figure>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-30 object-contain"
                        />
                      </figure>
                      <div className="card-body p-0">
                        <h2 className="card-title text-xs p-0">{item.name}</h2>
                      </div>
                    </div>
                  ))}
                  </div>
              </div>
            </div>
            {/* featured products */}
            <div className="card bg-white shadow-md">
              <div className="card-body">
                <h2 className="card-title">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredItems.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-md bg-white">
                      <figure>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-30 object-contain"
                        />
                      </figure>
                      <div className="card-body p-0">
                        <h2 className="card-title text-xs p-0">{item.name}</h2>
                      </div>
                    </div>
                  ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
        {/* featured products */}
        <div className="card bg-white mt-6">
          <div className="card-body">
            <h2 className="card-title">Featured Products</h2>
              <div 
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto"
              style={{
                display: "flex",
                overflowX: "auto",
                paddingBottom: "1rem",
              }}
              >
              {products.map((item) => (
                <div key={item.id} className="card bg-base-100 shadow-md bg-white flex-shrink-0 w-60">
                  <figure>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-contain"
                    />
                  </figure>
                  <div className="card-body p-0">
                    <h2 className="card-title text-md p-4">{item.name}</h2>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
