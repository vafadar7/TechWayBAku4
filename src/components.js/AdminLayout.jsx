import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("almacenter_admin");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{ padding: 16, marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" className="brand">
              <span className="brand-mark">TW</span>
              <span>
                TechWay<span style={{ color: "#0ea5e9" }}>Baku</span>
              </span>
            </Link>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <NavLink to="/admin" end className={linkClass}>
                İdarə paneli
              </NavLink>
              <NavLink to="/admin/products" className={linkClass}>
                Məhsullar
              </NavLink>
              <NavLink to="/admin/products/new" className={linkClass}>
                Məhsul əlavə et
              </NavLink>
            </div>

            <button className="btn btn-danger" onClick={logout}>
              Çıxış
            </button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
