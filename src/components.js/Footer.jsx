import { Link } from "react-router-dom";
import siteData from "../data.js/siteData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}>
              <span
                className="brand-mark"
                style={{ background: "#fff", color: "#0f172a" }}
              >
                TW
              </span>
              <span>
                TechWay<span style={{ color: "#7dd3fc" }}>Baku</span>
              </span>
            </div>
            <p className="section-text" style={{ color: "#cbd5e1" }}>
              {siteData.businessDescription}
            </p>
          </div>

          <div>
            <h3 style={{ color: "#fff", marginTop: 0 }}>Naviqasiya</h3>
            <div style={{ display: "grid", gap: 10 }}>
              <Link to="/" className="small">
                Ana səhifə
              </Link>
              <Link to="/products" className="small">
                Məhsullar
              </Link>
              <Link to="/contact" className="small">
                Əlaqə
              </Link>
              <Link to="/cart" className="small">
                Səbət
              </Link>
              <Link to="/checkout" className="small">
                Sifariş
              </Link>
            </div>
          </div>

          <div>
            <h3 style={{ color: "#fff", marginTop: 0 }}>Əlaqə</h3>
            <div style={{ display: "grid", gap: 10 }}>
              <div className="small">Telefon: {siteData.phone}</div>
              <div className="small">WhatsApp: {siteData.whatsappNumber}</div>
              <div className="small">Ünvan: {siteData.address}</div>
              {siteData.workingHours && (
                <div className="small">
                  İş saatları: {siteData.workingHours}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} TechWayBaku. Bütün hüquqlar qorunur.</span>
          <span>Bakı, Azərbaycan</span>
        </div>
      </div>
    </footer>
  );
}
