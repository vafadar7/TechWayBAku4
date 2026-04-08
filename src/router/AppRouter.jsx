import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import AdminLayout from "../components.js/AdminLayout";
import ProtectedRoute from "../components.js/ProtectedRoute";

import Home from "../pages.js/Home";
import Products from "../pages.js/Products";
import ProductDetails from "../pages.js/ProductDetails";
import Cart from "../pages.js/Cart";
import Checkout from "../pages.js/Checkout";
import Contact from "../pages.js/Contact";
import NotFound from "../pages.js/NotFound";

import AdminLogin from "../pages.js/admin/AdminLogin";
import AdminDashboard from "../pages.js/admin/AdminDashboard";
import AdminProducts from "../pages.js/admin/AdminProducts";
import AdminAddProduct from "../pages.js/admin/AdminAddProduct";
import AdminEditProduct from "../pages.js/admin/AdminEditProduct";

export default function AppRouter({
  products,
  cartItems,
  totalItems,
  totalPrice,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  addProduct,
  updateProduct,
  deleteProduct,
}) {
  const publicProducts = products.filter((p) => p.status !== "inactive");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PublicLayout cartCount={totalItems} products={publicProducts} />
          }
        >
          <Route
            path="/"
            element={<Home products={publicProducts} onAddToCart={addToCart} />}
          />
          <Route
            path="/products"
            element={
              <Products products={publicProducts} onAddToCart={addToCart} />
            }
          />
          <Route
            path="/products/:slug"
            element={
              <ProductDetails
                products={publicProducts}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                totalPrice={totalPrice}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} totalPrice={totalPrice} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin"
            element={<AdminDashboard products={products} />}
          />
          <Route
            path="/admin/products"
            element={
              <AdminProducts
                products={products}
                deleteProduct={deleteProduct}
              />
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <AdminAddProduct products={products} addProduct={addProduct} />
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <AdminEditProduct
                products={products}
                updateProduct={updateProduct}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
