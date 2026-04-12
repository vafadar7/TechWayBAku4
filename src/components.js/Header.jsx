
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import siteData from "../data.js/siteData";
import {
  generateWhatsAppUrl,
  hasValidWhatsAppNumber,
} from "../utils/whatsapp";

const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv48Ml6ofYQmcqUE2cdyzq21hLiw23ZqChJw&s";

/* ── Əsas naviqasiya linkləri ── */
const NAV_LINKS = [
  { to: "/", label: "Ana səhifə", end: true, icon: "🏠" },
  { to: "/products", label: "Məhsullar", icon: "📦" },
  { to: "/contact", label: "Əlaqə", icon: "📞" },
  { to: "/cart", label: "Səbət", icon: "🛒" },
  { to: "/checkout", label: "Sifariş", icon: "✅" },
];

/* ── Kateqoriyalar ── */
const CATEGORIES = [
  { label: "Smartfonlar", icon: "📱" },
  { label: "Smart saatlar", icon: "⌚" },
  { label: "Noutbuklar", icon: "💻" },
  { label: "Planşetlər", icon: "📟" },
  { label: "Aksesuarlar", icon: "🎧" },
  { label: "Digər", icon: "📦" },
];

export default function Header({ cartCount = 0, products = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const closeDrawer = () => {
    setDrawerOpen(false);
    setCatsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/products?search=${encodeURIComponent(q)}`);
      setQuery("");
    }
  };

  const handleWhatsApp = () => {
    if (!hasValidWhatsAppNumber()) {
      alert("WhatsApp nömrəsi düzgün qurulmayıb.");
      return;
    }
    const url = generateWhatsAppUrl(`Salam, ${siteData.businessName}!`);
    window.location.href = url;
    closeDrawer();
  };

  const activeCls = ({ isActive }) =>
    `catalog-link${isActive ? " active" : ""}`;

  return (
    <>
      {/* ══════════════ QARA HEADER BAR ══════════════ */}
      <header className="header">
        <div className="container header-inner">

          {/* Sol — 3 xətli icon */}
          <button
            className="catalog-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Menyunu aç"
            aria-expanded={drawerOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Mərkəz — Logo + Axtarış */}
          <Link to="/" className="header-brand" aria-label="Ana səhifə">
            <img
              src={LOGO_URL}
              alt="TechWayBaku"
              style={{
                width: 34,
                height: 34,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
            <span>
              TechWay<span style={{ color: "#f87171" }}>Baku</span>
            </span>
          </Link>

          <form className="header-search" onSubmit={handleSearch}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Məhsul axtar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Məhsul axtar"
            />
          </form>

          {/* Sağ — Səbət */}
          <Link to="/cart" className="header-cart" aria-label="Səbət">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61H19a2 2 0 001.98-1.71L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ══════════════ DRAWER ══════════════ */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="catalog-backdrop"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <nav
            className="catalog-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Əsas menyu"
          >
            {/* Drawer başlıq */}
            <div className="catalog-drawer-head">
              <Link
                to="/"
                className="header-brand"
                style={{ color: "#111" }}
                onClick={closeDrawer}
              >
                <img
                  src={LOGO_URL}
                  alt="TechWayBaku"
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
                <span style={{ color: "#111" }}>
                  TechWay
                  <span style={{ color: "#e11d48" }}>Baku</span>
                </span>
              </Link>

              <button
                className="drawer-close"
                onClick={closeDrawer}
                aria-label="Menyunu bağla"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer body */}
            <div className="catalog-drawer-body">

              {/* ── Əsas naviqasiya ── */}
              <p className="catalog-section-title">Menyu</p>

              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={activeCls}
                  onClick={closeDrawer}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}

              {/* ── Kateqoriyalar (accordion) ── */}
              <p className="catalog-section-title" style={{ marginTop: 20 }}>
                Kateqoriyalar
              </p>

              {/* Accordion toggle */}
              <button
                type="button"
                onClick={() => setCatsOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 12px",
                  border: 0,
                  borderRadius: 10,
                  background: catsOpen ? "#fee2e2" : "#f3f4f6",
                  color: catsOpen ? "#e11d48" : "#111827",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background .15s",
                  marginBottom: 4,
                }}
                aria-expanded={catsOpen}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>📂</span>
                  Kateqoriyalar
                </span>
                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transform: catsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform .2s",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Kateqoriya siyahısı */}
              {catsOpen && (
                <div
                  style={{
                    paddingLeft: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    animation: "dropDown .15s ease",
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.label}
                      to={`/products?category=${encodeURIComponent(cat.label)}`}
                      className="catalog-link"
                      style={{ fontSize: 13 }}
                      onClick={closeDrawer}
                    >
                      <span style={{ fontSize: 15 }}>{cat.icon}</span>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* ── Əlaqə və Kömək ── */}
              <p className="catalog-section-title" style={{ marginTop: 20 }}>
                Digər
              </p>

              {/* WhatsApp-da yaz */}
              <button
                type="button"
                className="catalog-link"
                style={{
                  width: "100%",
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onClick={handleWhatsApp}
              >
                <span style={{ fontSize: 16 }}>💬</span>
                WhatsApp-da yaz
              </button>

              {/* Əlaqə məlumatları */}
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 12px",
                  background: "#f9fafb",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#6b7280",
                  lineHeight: 1.8,
                }}
              >
                <div>📞 {siteData.phone}</div>
                <div>📍 {siteData.address}</div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
