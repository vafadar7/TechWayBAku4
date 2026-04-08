import { Link } from "react-router-dom";
import ProductCard from "../components.js/ProductCard";
import siteData from "../data.js/siteData";

const trustItems = [
  { icon: "✓", title: "Rəsmi zəmanət", text: "Bütün məhsullar zəmanətlə." },
  { icon: "📱", title: "Geniş çeşid", text: "Smartfonlar və aksesuarlar." },
  {
    icon: "💰",
    title: "Münasib qiymət",
    text: "Keyfiyyət, əlverişli qiymətlə.",
  },
  {
    icon: "⚡",
    title: "Sürətli dəstək",
    text: "Operativ cavab, rahat sifariş.",
  },
];

export default function Home({ products, onAddToCart }) {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-panel">
            <div className="hero-grid">
              <div>
                <div className="hero-kicker">Premium elektronika mağazası</div>
                <h1 className="page-title hero-title">
                  Keyfiyyətli texnika,
                  <br />
                  əminlik ilə.
                </h1>
                <p className="hero-sub">{siteData.businessDescription}</p>

                <div className="hero-actions">
                  <Link to="/products" className="btn btn-accent">
                    Məhsullara bax
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    Əlaqə saxla
                  </Link>
                </div>
              </div>

              <div className="hero-trust-grid">
                {trustItems.map((item) => (
                  <div key={item.title} className="trust-card">
                    <span className="trust-icon">{item.icon}</span>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seçilmiş məhsullar ── */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head-between">
            <div>
              <h2 className="section-title">Seçilmiş məhsullar</h2>
              <p className="section-text">
                Ən çox maraq oyandıran məhsullara nəzər sal.
              </p>
            </div>
            <Link to="/products" className="btn btn-secondary">
              Hamısına bax
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="product-grid">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <div className="empty-icon">📦</div>
              <h2>Məhsul yoxdur</h2>
              <p className="section-text">Hələ məhsul əlavə olunmayıb.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-tight">
        <div className="container">
          <div className="cta-banner card">
            <h2 className="section-title" style={{ color: "#fff" }}>
              Uyğun məhsulu indi tap
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.72)",
                marginBottom: 18,
                lineHeight: 1.7,
              }}
            >
              Geniş məhsul seçimi, aydın məhsul kartları və rahat əlaqə imkanı.
            </p>
            <Link to="/products" className="btn btn-accent">
              Bütün məhsullara bax
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
