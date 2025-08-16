import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";

type ProductItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const ProductItem = ({ id, name, price, image }: ProductItemProps) => {
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart({ id, name, price, image });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="rounded-xl p-6 bg-white shadow-lg hover:shadow-xl 
                  transform hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-xl mb-4 group">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transform group-hover:scale-110 
                   transition-transform duration-500"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <h3 className="font-semibold text-xl mb-2 text-gray-800">{name}</h3>
      <p className="text-blue-600 mb-4 text-2xl font-bold">
        ${price.toFixed(2)}
      </p>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-300 
                 hover:scale-105 ${
                   isLoading
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                 }`}
      >
        {isLoading ? (
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
  );
};

export default ProductItem;
