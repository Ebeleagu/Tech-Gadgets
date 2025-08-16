import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { products } from "../Data/products";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async (product: Product) => {
    setLoadingProducts((prev) => new Set(prev).add(product.id));
    try {
      await addToCart(product);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setLoadingProducts((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl p-6 bg-white shadow-md animate-pulse"
            >
              <div className="h-64 bg-gray-200 rounded-xl mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center animate-fadeIn">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="rounded-xl p-6 bg-white shadow-lg hover:shadow-xl 
                     transform hover:-translate-y-2 transition-all duration-300 
                     animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden rounded-xl mb-4 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 
                         transition-transform duration-500"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">
              {product.name}
            </h3>
            <p className="text-blue-600 mb-4 text-2xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={loadingProducts.has(product.id)}
              className={`w-full py-3 px-4 rounded-lg transition-all duration-300 
                       hover:scale-105 ${
                         loadingProducts.has(product.id)
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                       }`}
            >
              {loadingProducts.has(product.id) ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Adding...</span>
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
