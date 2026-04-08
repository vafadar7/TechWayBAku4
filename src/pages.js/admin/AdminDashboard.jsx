import { Link, useNavigate } from "react-router-dom";

function StatCard({ label, value }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <p className="small muted" style={{ marginTop: 0 }}>
        {label}
      </p>
      <h3 style={{ margin: 0, fontSize: 30 }}>{value}</h3>
    </div>
  );
}

export default function AdminDashboard({ products }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("almacenter_admin");
    navigate("/admin/login");
  };

  const totalProducts = products.length;
  const newProducts = products.filter((p) => p.condition === "new").length;
  const usedProducts = products.filter((p) => p.condition === "used").length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const lowStock = products.filter((p) => Number(p.stock) <= 3).length;

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
          <h1 className="page-title">İdarə paneli</h1>
          <p className="section-text" style={{ marginTop: 10 }}>
            Məhsulları idarə et, yeni məhsul əlavə et və mövcud məhsulları
            yenilə.
          </p>
        </div>

        <button className="btn btn-danger" onClick={logout}>
          Çıxış
        </button>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        <StatCard label="Ümumi məhsullar" value={totalProducts} />
        <StatCard label="Yeni məhsullar" value={newProducts} />
        <StatCard label="İşlənmiş məhsullar" value={usedProducts} />
        <StatCard label="Seçilmiş məhsullar" value={featuredProducts} />
        <StatCard label="Az stok" value={lowStock} />
      </div>

      <div className="card" style={{ padding: 24, marginTop: 18 }}>
        <h2 className="section-title" style={{ marginBottom: 10 }}>
          Sürətli keçidlər
        </h2>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/admin/products/new" className="btn btn-accent">
            Məhsul əlavə et
          </Link>
          <Link to="/admin/products" className="btn btn-secondary">
            Məhsulları idarə et
          </Link>
        </div>
      </div>
    </div>
  );
}
