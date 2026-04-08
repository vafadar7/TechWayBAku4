import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("almacenter_admin") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@techwaybaku.az" && password === "123456") {
      localStorage.setItem("almacenter_admin", "true");
      navigate("/admin");
      return;
    }

    setError("Email və ya şifrə yanlışdır");
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="card" style={{ padding: 28 }}>
          <h1 className="section-title">Admin Giriş</h1>
          <p className="section-text" style={{ marginBottom: 20 }}>
            TechWayBaku admin panelinə daxil olmaq üçün login et.
          </p>

          <form onSubmit={handleSubmit} className="grid" style={{ gap: 14 }}>
            <div>
              <label className="filter-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@techwaybaku.az"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="filter-label" htmlFor="password">
                Şifrə
              </label>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="small"
                style={{ color: "#e11d48", fontWeight: 700 }}
              >
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-accent">
              Daxil ol
            </button>
          </form>

          <div style={{ marginTop: 16 }}>
            <Link to="/" className="small" style={{ color: "#e11d48" }}>
              ← Ana səhifəyə qayıt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
