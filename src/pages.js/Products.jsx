import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components.js/ProductCard";

export default function Products({ products, onAddToCart }) {
  const [searchParams] = useSearchParams();
  const filterPanelRef = useRef(null);

  /* ── Filter state ── */
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "all");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [condition, setCondition] = useState(
    searchParams.get("condition") || "all"
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [storage, setStorage] = useState("all");
  const [ram, setRam] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  /* Panelin xaricini klik edəndə bağla */
  useEffect(() => {
    if (!filterOpen) return;
    const handleClick = (e) => {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(e.target)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen]);

  /* ── Options ── */
  const brandOptions = useMemo(
    () => ["all", ...new Set(products.map((p) => p.brand).filter(Boolean))],
    [products]
  );
  const categoryOptions = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );
  const storageOptions = useMemo(() => {
    const vals = products.map((p) => p.storage).filter(Boolean);
    const unique = [...new Set(vals)].sort(
      (a, b) =>
        (parseInt(String(a).replace(/\D/g, "")) || 0) -
        (parseInt(String(b).replace(/\D/g, "")) || 0)
    );
    return ["all", ...unique];
  }, [products]);
  const ramOptions = useMemo(() => {
    const vals = products.map((p) => p.ram).filter(Boolean);
    const unique = [...new Set(vals)].sort(
      (a, b) =>
        (parseInt(String(a).replace(/\D/g, "")) || 0) -
        (parseInt(String(b).replace(/\D/g, "")) || 0)
    );
    return ["all", ...unique];
  }, [products]);

  /* ── Filtered & sorted list ── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = products.filter((p) => {
      if (q) {
        const hay =
          `${p.name} ${p.brand} ${p.category} ${p.shortDescription}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (brand !== "all" && p.brand !== brand) return false;
      if (category !== "all" && p.category !== category) return false;
      if (condition !== "all" && p.condition !== condition) return false;
      if (minPrice !== "" && Number(p.price) < Number(minPrice)) return false;
      if (maxPrice !== "" && Number(p.price) > Number(maxPrice)) return false;
      if (storage !== "all" && p.storage !== storage) return false;
      if (ram !== "all" && p.ram !== ram) return false;
      if (inStockOnly && Number(p.stock) <= 0) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "popular":
          return (
            Number(b.popular) - Number(a.popular) ||
            new Date(b.createdAt) - new Date(a.createdAt)
          );
        default:
          return (
            Number(b.featured) - Number(a.featured) ||
            Number(b.popular) - Number(a.popular) ||
            new Date(b.createdAt) - new Date(a.createdAt)
          );
      }
    });
  }, [
    products,
    search,
    brand,
    category,
    condition,
    minPrice,
    maxPrice,
    storage,
    ram,
    inStockOnly,
    sortBy,
  ]);

  /* ── Reset ── */
  const reset = () => {
    setSearch("");
    setBrand("all");
    setCategory("all");
    setCondition("all");
    setMinPrice("");
    setMaxPrice("");
    setStorage("all");
    setRam("all");
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    search ||
    brand !== "all" ||
    category !== "all" ||
    condition !== "all" ||
    minPrice ||
    maxPrice ||
    storage !== "all" ||
    ram !== "all" ||
    inStockOnly;

  /* ── Field helper ── */
  const Field = ({ label, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label className="filter-label">{label}</label>
      {children}
    </div>
  );

  return (
    <section className="section">
      <div className="container">
        {/* Başlıq */}
        <div className="products-header">
          <div>
            <h1 className="page-title">Məhsullar</h1>
            <p className="section-text" style={{ marginTop: 8 }}>
              Uyğun məhsulu axtarış, filtr və sıralama ilə rahat tap.
            </p>
          </div>
          <Link to="/cart" className="btn btn-secondary">
            Səbətə bax
          </Link>
        </div>

        {/* Filtr düyməsi + aktiv göstərici */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
            position: "relative",
          }}
          ref={filterPanelRef}
        >
          <button
            type="button"
            className={`btn ${filterOpen ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setFilterOpen((v) => !v)}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {/* Filtr ikonu */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filtr
            {hasActiveFilters && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#e11d48",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                ✓
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={reset}
              style={{ color: "#e11d48" }}
            >
              Sıfırla
            </button>
          )}

          {/* ── Açılan filtr paneli ── */}
          {filterOpen && (
            <div className="filter-dropdown-panel">
              {/* Axtarış */}
              <Field label="Axtarış">
                <input
                  className="input"
                  type="search"
                  placeholder="Məhsul, marka, kateqoriya..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Field>

              {/* Marka */}
              <Field label="Marka">
                <select
                  className="select"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brandOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === "all" ? "Bütün markalar" : o}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Kateqoriya */}
              <Field label="Kateqoriya">
                <select
                  className="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === "all" ? "Bütün kateqoriyalar" : o}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Vəziyyət */}
              <Field label="Vəziyyət">
                <select
                  className="select"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="all">Hamısı</option>
                  <option value="new">Yeni</option>
                  <option value="used">İşlənmiş</option>
                </select>
              </Field>

              {/* Daxili yaddaş */}
              <Field label="Daxili yaddaş">
                <select
                  className="select"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                >
                  {storageOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === "all" ? "Bütün yaddaşlar" : o}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Operativ yaddaş */}
              <Field label="Operativ yaddaş (RAM)">
                <select
                  className="select"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                >
                  {ramOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === "all" ? "Bütün RAM" : o}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Qiymət aralığı */}
              <Field label="Qiymət aralığı (AZN)">
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    className="input"
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <span style={{ color: "#9ca3af", fontWeight: 700 }}>—</span>
                  <input
                    className="input"
                    type="number"
                    placeholder="Maks"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>
              </Field>

              {/* Sıralama */}
              <Field label="Sıralama">
                <select
                  className="select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Seçilmiş</option>
                  <option value="popular">Məşhur</option>
                  <option value="newest">Ən yeni</option>
                  <option value="price-low">Qiymət: aşağıdan yuxarı</option>
                  <option value="price-high">Qiymət: yuxarıdan aşağı</option>
                </select>
              </Field>

              {/* Stok checkbox */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "6px 0",
                }}
              >
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                Yalnız stokda olanlar
              </label>

              {/* Sıfırla */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={reset}
                style={{ width: "100%", marginTop: 4 }}
              >
                Filtrləri sıfırla
              </button>
            </div>
          )}
        </div>

        {/* Nəticə sayı */}
        <div className="products-meta">
          <p className="section-text">
            <strong>{filtered.length}</strong> məhsul tapıldı
          </p>
        </div>

        {/* Məhsul grid */}
        {filtered.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Məhsul tapılmadı</h2>
            <p className="section-text">Filtrləri dəyiş və yenidən yoxla.</p>
            <button type="button" className="btn btn-accent" onClick={reset}>
              Filtrləri sıfırla
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
