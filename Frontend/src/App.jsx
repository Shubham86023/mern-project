import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavbarTop from "./Components/NavbarTop";
import Home from "./Components/Home";
import Products from "./Components/Product/ProductList";
import ProductForm from "./Components/Product/ProductForm";

function App() {
  return (
    <>
      <Router>
        <NavbarTop />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productForm" element={<ProductForm />} />
            <Route path="/productEdit/:uid" element={<ProductForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
