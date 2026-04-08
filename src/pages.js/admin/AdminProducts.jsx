import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/format";

export default function AdminProducts({ products, deleteProduct }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      const matchesFilter = filter === "all" || product.condition === filter;

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const handleDelete = (id) => {
    const ok = window.confirm("Bu məhsulu silmək istəyirsən?");
    if (ok) deleteProduct(id);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div>
          <h1 className="page-title">Məhsullar</h1>
          <p className="section-text" style={{ marginTop: 10 }}>
            Məhsulları əlavə et, redaktə et və sil.
          </p>
        </div>

        <Link to="/admin/products/new" className="btn btn-accent">
          Məhsul əlavə et
        </Link>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 18 }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "2fr 1fr",
            gap: 12,
          }}
        >
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Axtar..."
          />

          <select
            className="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Hamısı</option>
            <option value="new">Yeni</option>
            <option value="used">İşlənmiş</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card empty-state">
          <h2>Məhsul tapılmadı</h2>
          <p className="section-text">Axtarışı və filtri dəyiş.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="card card-hover"
              style={{ overflow: "hidden" }}
            >
              <img
                src={product.mainImage}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  background: "#e2e8f0",
                }}
              />

              <div style={{ padding: 18 }}>
                <div className="product-meta">
                  <span className="badge badge-neutral">{product.brand}</span>
                  <span className="badge badge-accent">{product.category}</span>
                </div>

                <h3 className="product-name" style={{ marginTop: 10 }}>
                  {product.name}
                </h3>

                <p className="small muted" style={{ marginTop: 8 }}>
                  {product.condition === "new" ? "Yeni" : "İşlənmiş"} • Stok:{" "}
                  {product.stock} •{" "}
                  {product.status === "active" ? "Aktiv" : "Deaktiv"}
                </p>

                <p className="small" style={{ marginTop: 8 }}>
                  Qiymət: <strong>{formatPrice(product.price)}</strong>
                </p>

                <p className="small muted" style={{ marginTop: 8 }}>
                  Yaradılma: {product.createdAt || "-"}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 14,
                  }}
                >
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate(`/admin/products/${product.id}/edit`)
                    }
                  >
                    Redaktə et
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
