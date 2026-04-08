import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import siteData from "../data.js/siteData";

const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv48Ml6ofYQmcqUE2cdyzq21hLiw23ZqChJw&s";

const CATALOG_ITEMS = [
  { label: "Smartfonlar" },
  { label: "Smart saatlar" },
  { label: "Noutbuklar" },
  { label: "Planşetlər" },
  { label: "Aksesuarlar" },
  { label: "Digər" },
];

export default function Header({ cartCount = 0, products = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/products?search=${encodeURIComponent(q)}`);
      setQuery("");
    }
  };

  return (
    <>
      {/* ── Qara header bar ── */}
      <header className="header">
        <div className="container header-inner">
          {/* Sol — 3 xətli icon (sözsüz) */}
          <button
            className="catalog-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Menyunu aç"
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

      {/* ── Catalog Drawer ── */}
      {drawerOpen && (
        <div className="catalog-backdrop" onClick={() => setDrawerOpen(false)}>
          <nav
            className="catalog-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Kataloq menyusu"
          >
            {/* Drawer başlıq */}
            <div className="catalog-drawer-head">
              <Link
                to="/"
                className="header-brand"
                style={{ color: "#111" }}
                onClick={() => setDrawerOpen(false)}
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
                <span>
                  TechWay<span style={{ color: "#e11d48" }}>Baku</span>
                </span>
              </Link>
              <button
                className="drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Bağla"
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
              <p className="catalog-section-title">Kateqoriyalar</p>
              {CATALOG_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={`/products?category=${encodeURIComponent(item.label)}`}
                  className="catalog-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              <p className="catalog-section-title" style={{ marginTop: 20 }}>
                Əlaqə
              </p>
              <div
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                <div>{siteData.phone}</div>
                <div>{siteData.address}</div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
