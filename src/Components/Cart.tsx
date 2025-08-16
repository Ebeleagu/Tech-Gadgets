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
      <div className="p-8 text-center">
        <div className="text-3xl font-bold text-gray-500 mb-4">
          Your cart is empty
        </div>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg
                   hover:bg-blue-700 transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>
      <ul className="space-y-6">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md
                     hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md mr-6"
            />
            <div className="flex-1">
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </div>
              <div className="text-lg text-blue-600 font-bold mb-3">
                ${item.price.toFixed(2)}
              </div>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-md
                           transition-colors duration-200"
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-50 border-y border-gray-100">
                  {item.quantity}
                </span>
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-md
                           transition-colors duration-200"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-700 mx-6">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50
                       rounded-full transition-colors duration-200"
              onClick={() => removeFromCart(item.id)}
            >
              <svg
                className="w-6 h-6"
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
          </li>
        ))}
      </ul>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between text-xl mb-4">
          <span>Total Items:</span>
          <span className="font-bold">{totalItems}</span>
        </div>
        <div className="flex justify-between text-2xl text-blue-600">
          <span>Total Price:</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg
                   hover:bg-green-700 transition-colors duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
