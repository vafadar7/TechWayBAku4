import { useEffect, useMemo, useState } from "react";
import AppRouter from "./router/AppRouter";
import seedProducts from "./data.js/products";

const PRODUCTS_STORAGE_KEY = "almacenter_products";
const CART_STORAGE_KEY = "almacenter_cart";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeProduct(product) {
  const gallery = Array.isArray(product.gallery)
    ? product.gallery.filter(Boolean)
    : [];

  return {
    id: String(product.id ?? Date.now()),
    name: product.name || "",
    slug: product.slug || "",
    brand: product.brand || "",
    category: product.category || "",
    condition: product.condition || "new",
    price: Number(product.price) || 0,
    oldPrice:
      product.oldPrice === "" || product.oldPrice == null
        ? ""
        : Number(product.oldPrice),
    currency: product.currency || "AZN",
    warranty: product.warranty || "",
    stock: Number(product.stock) || 0,
    shortDescription: product.shortDescription || "",
    fullDescription: product.fullDescription || "",
    specifications:
      product.specifications && typeof product.specifications === "object"
        ? product.specifications
        : {},
    featured: Boolean(product.featured),
    popular: Boolean(product.popular),
    status: product.status || "active",
    mainImage: product.mainImage || gallery[0] || "",
    gallery,
    createdAt: product.createdAt || today(),
    updatedAt: product.updatedAt || today(),
  };
}

function loadProducts() {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map(normalizeProduct);
    }
  } catch {
    // ignore
  }

  return seedProducts.map(normalizeProduct);
}

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [products, setProducts] = useState(loadProducts);
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { ...product, quantity }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === String(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCartItems((current) =>
      current.filter((item) => item.id !== String(productId))
    );
  };

  const clearCart = () => setCartItems([]);

  const addProduct = (payload) => {
    const nextProduct = normalizeProduct({
      ...payload,
      id: String(Date.now()),
      createdAt: today(),
      updatedAt: today(),
    });

    setProducts((current) => [nextProduct, ...current]);
    return nextProduct;
  };

  const updateProduct = (id, payload) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === String(id)
          ? normalizeProduct({
              ...item,
              ...payload,
              id: String(id),
              createdAt: item.createdAt || today(),
              updatedAt: today(),
            })
          : item
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((current) => current.filter((item) => item.id !== String(id)));
    setCartItems((current) => current.filter((item) => item.id !== String(id)));
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <AppRouter
      products={products}
      cartItems={cartItems}
      totalItems={totalItems}
      totalPrice={totalPrice}
      addToCart={addToCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      removeItem={removeItem}
      clearCart={clearCart}
      addProduct={addProduct}
      updateProduct={updateProduct}
      deleteProduct={deleteProduct}
    />
  );
}
