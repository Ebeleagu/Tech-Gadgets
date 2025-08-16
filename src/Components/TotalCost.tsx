import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";

const TotalCost = () => {
  const { totalItems, totalPrice } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.alert("Thank you for your purchase!");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Items in Cart:</span>
          <span className="font-semibold text-lg">{totalItems}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isProcessing || totalItems === 0}
        className={`w-full mt-6 py-4 rounded-lg text-white font-semibold
                   transition-all duration-300 transform hover:scale-[1.02]
                   ${
                     isProcessing || totalItems === 0
                       ? "bg-gray-400 cursor-not-allowed"
                       : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
                   }`}
      >
        {isProcessing ? (
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
            <span>Processing...</span>
          </span>
        ) : (
          `Checkout (${totalItems} ${totalItems === 1 ? "item" : "items"})`
        )}
      </button>
    </div>
  );
};

export default TotalCost;
