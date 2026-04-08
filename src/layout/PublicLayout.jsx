import { Outlet } from "react-router-dom";
import Header from "../components.js/Header";
import Footer from "../components.js/Footer";
import WhatsAppFloatingButton from "../components.js/WhatsAppFloatingButton";

export default function PublicLayout({ cartCount = 0, products = [] }) {
  return (
    <div className="app-shell">
      <Header cartCount={cartCount} products={products} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
