import { Link } from "react-router-dom";
import { generateWhatsAppUrl, hasValidWhatsAppNumber, buildWhatsAppMessage } from "../utils/whatsapp";
import { formatPrice } from "../utils/format";

export default function Checkout({ cartItems, totalPrice }) {

  const handleWhatsApp = () => {
    if (!hasValidWhatsAppNumber()) {
      alert(
        "WhatsApp nömrəsi düzgün qurulmayıb. siteData.js daxilində 994XXXXXXXXX formatından istifadə et."
      );
      return;
    }
    const message = buildWhatsAppMessage(cartItems, {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      note: "",
    });
    const url = generateWhatsAppUrl(message);
    window.location.href = url;
  };

  if (!cartItems.length) {
    return (
      <section className="section">
        <div className="container">
          <div className="card empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Sifariş üçün səbət boşdur</h2>
            <p className="section-text">
              Əvvəl məhsul əlavə et, sonra sifarişə keç.
            </p>
            <Link to="/products" className="btn btn-primary">
              Məhsullara bax
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">

        {/* Başlıq */}
        <div style={{ marginBottom: 24 }}>
          <h1 className="page-title">Sifariş</h1>
          <p className="section-text" style={{ marginTop: 8 }}>
            Məhsullarınızı yoxlayın və WhatsApp vasitəsilə sifariş göndərin.
          </p>
        </div>

        {/* Sifariş xülasəsi — tam enli, tək sütun */}
        <div
          style={{
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          <div className="card" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 18 }}>
              Sifariş xülasəsi
            </h2>

            {/* Məhsul siyahısı */}
            <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    background: "#f9fafb",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 4,
                        color: "#111",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="small muted"
                      style={{ fontSize: 12 }}
                    >
                      {formatPrice(item.price)} × {item.quantity}
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#e11d48",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Aralıq cəmlər */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: 14,
                display: "grid",
                gap: 10,
              }}
            >
              <div className="summary-row">
                <span className="small muted">Məhsul sayı</span>
                <strong className="small">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)} ədəd
                </strong>
              </div>

              <div className="summary-row">
                <span className="small muted">Ara cəm</span>
                <strong className="small">{formatPrice(totalPrice)}</strong>
              </div>

              <div className="summary-row">
                <span className="small muted">Çatdırılma</span>
                <strong className="small">Razılaşdırılır</strong>
              </div>

              <div
                className="summary-row"
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                <span
                  style={{ fontWeight: 800, fontSize: 16, color: "#111" }}
                >
                  Cəmi
                </span>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#e11d48",
                  }}
                >
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* WhatsApp button */}
            <button
              type="button"
              className="btn btn-accent"
              style={{ width: "100%", marginTop: 20, fontSize: 15 }}
              onClick={handleWhatsApp}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.535a.75.75 0 00.918.918l5.686-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 01-4.951-1.356l-.355-.211-3.676.95.975-3.565-.23-.368A9.693 9.693 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              WhatsApp ilə sifariş ver
            </button>

            {/* Alt keçid linkləri */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/cart"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Səbətə qayıt
              </Link>
              <Link
                to="/products"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Alış-verişə davam et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}import { Link } from "react-router-dom";
import { generateWhatsAppUrl, hasValidWhatsAppNumber, buildWhatsAppMessage } from "../utils/whatsapp";
import { formatPrice } from "../utils/format";

export default function Checkout({ cartItems, totalPrice }) {

  const handleWhatsApp = () => {
    if (!hasValidWhatsAppNumber()) {
      alert(
        "WhatsApp nömrəsi düzgün qurulmayıb. siteData.js daxilində 994XXXXXXXXX formatından istifadə et."
      );
      return;
    }
    const message = buildWhatsAppMessage(cartItems, {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      note: "",
    });
    const url = generateWhatsAppUrl(message);
    window.location.href = url;
  };

  if (!cartItems.length) {
    return (
      <section className="section">
        <div className="container">
          <div className="card empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Sifariş üçün səbət boşdur</h2>
            <p className="section-text">
              Əvvəl məhsul əlavə et, sonra sifarişə keç.
            </p>
            <Link to="/products" className="btn btn-primary">
              Məhsullara bax
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">

        {/* Başlıq */}
        <div style={{ marginBottom: 24 }}>
          <h1 className="page-title">Sifariş</h1>
          <p className="section-text" style={{ marginTop: 8 }}>
            Məhsullarınızı yoxlayın və WhatsApp vasitəsilə sifariş göndərin.
          </p>
        </div>

        {/* Sifariş xülasəsi — tam enli, tək sütun */}
        <div
          style={{
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          <div className="card" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 18 }}>
              Sifariş xülasəsi
            </h2>

            {/* Məhsul siyahısı */}
            <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    background: "#f9fafb",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 4,
                        color: "#111",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="small muted"
                      style={{ fontSize: 12 }}
                    >
                      {formatPrice(item.price)} × {item.quantity}
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#e11d48",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Aralıq cəmlər */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: 14,
                display: "grid",
                gap: 10,
              }}
            >
              <div className="summary-row">
                <span className="small muted">Məhsul sayı</span>
                <strong className="small">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)} ədəd
                </strong>
              </div>

              <div className="summary-row">
                <span className="small muted">Ara cəm</span>
                <strong className="small">{formatPrice(totalPrice)}</strong>
              </div>

              <div className="summary-row">
                <span className="small muted">Çatdırılma</span>
                <strong className="small">Razılaşdırılır</strong>
              </div>

              <div
                className="summary-row"
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                <span
                  style={{ fontWeight: 800, fontSize: 16, color: "#111" }}
                >
                  Cəmi
                </span>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#e11d48",
                  }}
                >
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* WhatsApp button */}
            <button
              type="button"
              className="btn btn-accent"
              style={{ width: "100%", marginTop: 20, fontSize: 15 }}
              onClick={handleWhatsApp}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.535a.75.75 0 00.918.918l5.686-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 01-4.951-1.356l-.355-.211-3.676.95.975-3.565-.23-.368A9.693 9.693 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              WhatsApp ilə sifariş ver
            </button>

            {/* Alt keçid linkləri */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/cart"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Səbətə qayıt
              </Link>
              <Link
                to="/products"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Alış-verişə davam et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}import { Link } from "react-router-dom";
import { generateWhatsAppUrl, hasValidWhatsAppNumber, buildWhatsAppMessage } from "../utils/whatsapp";
import { formatPrice } from "../utils/format";

export default function Checkout({ cartItems, totalPrice }) {

  const handleWhatsApp = () => {
    if (!hasValidWhatsAppNumber()) {
      alert(
        "WhatsApp nömrəsi düzgün qurulmayıb. siteData.js daxilində 994XXXXXXXXX formatından istifadə et."
      );
      return;
    }
    const message = buildWhatsAppMessage(cartItems, {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      note: "",
    });
    const url = generateWhatsAppUrl(message);
    window.location.href = url;
  };

  if (!cartItems.length) {
    return (
      <section className="section">
        <div className="container">
          <div className="card empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Sifariş üçün səbət boşdur</h2>
            <p className="section-text">
              Əvvəl məhsul əlavə et, sonra sifarişə keç.
            </p>
            <Link to="/products" className="btn btn-primary">
              Məhsullara bax
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">

        {/* Başlıq */}
        <div style={{ marginBottom: 24 }}>
          <h1 className="page-title">Sifariş</h1>
          <p className="section-text" style={{ marginTop: 8 }}>
            Məhsullarınızı yoxlayın və WhatsApp vasitəsilə sifariş göndərin.
          </p>
        </div>

        {/* Sifariş xülasəsi — tam enli, tək sütun */}
        <div
          style={{
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          <div className="card" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 18 }}>
              Sifariş xülasəsi
            </h2>

            {/* Məhsul siyahısı */}
            <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    background: "#f9fafb",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 4,
                        color: "#111",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="small muted"
                      style={{ fontSize: 12 }}
                    >
                      {formatPrice(item.price)} × {item.quantity}
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#e11d48",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Aralıq cəmlər */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: 14,
                display: "grid",
                gap: 10,
              }}
            >
              <div className="summary-row">
                <span className="small muted">Məhsul sayı</span>
                <strong className="small">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)} ədəd
                </strong>
              </div>

              <div className="summary-row">
                <span className="small muted">Ara cəm</span>
                <strong className="small">{formatPrice(totalPrice)}</strong>
              </div>

              <div className="summary-row">
                <span className="small muted">Çatdırılma</span>
                <strong className="small">Razılaşdırılır</strong>
              </div>

              <div
                className="summary-row"
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                <span
                  style={{ fontWeight: 800, fontSize: 16, color: "#111" }}
                >
                  Cəmi
                </span>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#e11d48",
                  }}
                >
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* WhatsApp button */}
            <button
              type="button"
              className="btn btn-accent"
              style={{ width: "100%", marginTop: 20, fontSize: 15 }}
              onClick={handleWhatsApp}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.535a.75.75 0 00.918.918l5.686-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 01-4.951-1.356l-.355-.211-3.676.95.975-3.565-.23-.368A9.693 9.693 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              WhatsApp ilə sifariş ver
            </button>

            {/* Alt keçid linkləri */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/cart"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Səbətə qayıt
              </Link>
              <Link
                to="/products"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Alış-verişə davam et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
