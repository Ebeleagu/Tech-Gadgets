import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 font-[times-new-roman]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-blue-600 hover:text-blue-700 
                     transition-colors duration-300 tracking-tight"
          >
            Gadgets
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="nav-link text-gray-600 hover:text-blue-600 
                       transition-all duration-300 text-xl relative group"
            >
              Products
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                           transition-all duration-300 group-hover:w-full"
              ></span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-blue-600 
                       transition-all duration-300 text-xl relative group"
            >
              Cart
              {totalItems > 0 && (
                <span
                  className="ml-2 bg-blue-600 text-white rounded-full px-3 py-1 
                             text-sm font-semibold animate-pulse"
                >
                  {totalItems}
                </span>
              )}
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                           transition-all duration-300 group-hover:w-full"
              ></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
