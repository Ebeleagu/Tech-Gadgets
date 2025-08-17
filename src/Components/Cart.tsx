import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="p-4 sm:p-8 text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-500 mb-4">
          Your cart is empty
        </div>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg
                   hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
        Shopping Cart
      </h2>
      <ul className="space-y-4 sm:space-y-6">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 
                     bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300
                     gap-3 sm:gap-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md sm:mr-6"
            />
            <div className="flex-1 min-w-0">
              <div className="text-base sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 truncate">
                {item.name}
              </div>
              <div className="text-sm sm:text-lg text-blue-600 font-bold mb-2 sm:mb-3">
                ${item.price.toFixed(2)}
              </div>
              <div className="flex items-center">
                <button
                  className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-md
                           transition-colors duration-200 text-sm sm:text-base"
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantity === 1}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className="px-3 sm:px-4 py-1 bg-gray-50 border-y border-gray-100 text-sm sm:text-base">
                  {item.quantity}
                </span>
                <button
                  className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-md
                           transition-colors duration-200 text-sm sm:text-base"
                  onClick={() => increaseQuantity(item.id)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto sm:mx-6">
              <div className="text-base sm:text-lg font-semibold text-gray-700">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="p-1.5 sm:p-2 text-red-600 hover:text-red-700 hover:bg-red-50
                         rounded-full transition-colors duration-200"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between text-lg sm:text-xl mb-3 sm:mb-4">
          <span>Total Items:</span>
          <span className="font-bold">{totalItems}</span>
        </div>
        <div className="flex justify-between text-xl sm:text-2xl text-blue-600">
          <span>Total Price:</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-4 sm:mt-6 bg-green-600 text-white py-2.5 sm:py-3 rounded-lg
                   hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
