import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";

import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
