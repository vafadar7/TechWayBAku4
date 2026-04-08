import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="card empty-state">
          <h2>404 — Səhifə tapılmadı</h2>
          <p className="section-text">Axtardığın səhifə mövcud deyil.</p>
          <Link to="/" className="btn btn-primary">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </section>
  );
}
