import { useState } from "react";
import { Link } from "react-router-dom";
import {
  buildWhatsAppMessage,
  generateWhatsAppUrl,
  hasValidWhatsAppNumber,
} from "../utils/whatsapp";
import { formatPrice } from "../utils/format";

export default function Checkout({ cartItems, totalPrice }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Ad Soyad tələb olunur";
    if (!form.phone.trim()) nextErrors.phone = "Telefon nömrəsi tələb olunur";
    if (!form.address.trim()) nextErrors.address = "Ünvan tələb olunur";
    if (!cartItems.length) nextErrors.cart = "Səbət boşdur";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!hasValidWhatsAppNumber()) {
      setErrors({
        form: "WhatsApp nömrəsi düzgün qurulmayıb. siteData.js daxilində 994XXXXXXXXX formatından istifadə et.",
      });
      return;
    }

    const message = buildWhatsAppMessage(cartItems, form);
    const url = generateWhatsAppUrl(message);
    window.location.href = url;
  };

  if (!cartItems.length) {
    return (
      <section className="section">
        <div className="container">
          <div className="card empty-state">
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
        <div style={{ marginBottom: 18 }}>
          <h1 className="page-title">Sifariş</h1>
          <p className="section-text" style={{ marginTop: 10 }}>
            Onlayn ödəniş yoxdur. Sifariş WhatsApp vasitəsilə göndəriləcək.
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <form
            className="card"
            style={{ padding: 24 }}
            onSubmit={handleSubmit}
          >
            <h2 className="section-title" style={{ marginBottom: 18 }}>
              Məlumatları doldur
            </h2>

            <div className="grid" style={{ gap: 14 }}>
              <div>
                <label className="small" htmlFor="fullName">
                  Ad Soyad *
                </label>
                <input
                  id="fullName"
                  className="input"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Ad Soyad"
                />
                {errors.fullName && (
                  <div className="small" style={{ color: "#dc2626" }}>
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div>
                <label className="small" htmlFor="phone">
                  Telefon nömrəsi *
                </label>
                <input
                  id="phone"
                  className="input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="050 XXX XX XX"
                />
                {errors.phone && (
                  <div className="small" style={{ color: "#dc2626" }}>
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="small" htmlFor="city">
                  Şəhər
                </label>
                <input
                  id="city"
                  className="input"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Bakı"
                />
              </div>

              <div>
                <label className="small" htmlFor="address">
                  Çatdırılma ünvanı *
                </label>
                <textarea
                  id="address"
                  className="textarea"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Tam ünvan"
                />
                {errors.address && (
                  <div className="small" style={{ color: "#dc2626" }}>
                    {errors.address}
                  </div>
                )}
              </div>

              <div>
                <label className="small" htmlFor="note">
                  Qeyd (istəyə görə)
                </label>
                <textarea
                  id="note"
                  className="textarea"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Əlavə məlumat varsa yaz"
                />
              </div>
            </div>

            {errors.form && (
              <div
                className="card"
                style={{
                  padding: 14,
                  marginTop: 14,
                  background: "#fef2f2",
                  borderColor: "#fecaca",
                }}
              >
                <div
                  className="small"
                  style={{ color: "#b91c1c", fontWeight: 700 }}
                >
                  {errors.form}
                </div>
              </div>
            )}

            <div className="hero-actions" style={{ marginTop: 18 }}>
              <button type="submit" className="btn btn-accent">
                Sifarişi göndər
              </button>
              <Link to="/cart" className="btn btn-secondary">
                Səbətə qayıt
              </Link>
            </div>

            <div
              className="card"
              style={{ padding: 16, marginTop: 18, background: "#f8fafc" }}
            >
              <strong>Kömək lazımdır?</strong>
              <p className="section-text small" style={{ marginTop: 8 }}>
                Sifariş məsələsində kömək lazımdırsa, bizə WhatsApp-da yaza
                bilərsən.
              </p>
            </div>
          </form>

          <aside className="card cart-summary">
            <h2 className="section-title" style={{ marginBottom: 14 }}>
              Sifariş xülasəsi
            </h2>

            <div className="grid" style={{ gap: 12 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    padding: 14,
                    background: "#f8fafc",
                    borderColor: "#e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <strong style={{ display: "block" }}>{item.name}</strong>
                    <span>x{item.quantity}</span>
                  </div>
                  <div className="small muted" style={{ marginTop: 6 }}>
                    Vahid qiymət: {formatPrice(item.price)}
                  </div>
                  <div className="small" style={{ marginTop: 6 }}>
                    Cəmi:{" "}
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-row" style={{ marginTop: 18 }}>
              <span>Ara cəm</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <div className="summary-row">
              <span>Çatdırılma</span>
              <strong>Razılaşdırılır</strong>
            </div>
            <div className="summary-row" style={{ marginTop: 18 }}>
              <span className="summary-total">Cəmi</span>
              <span className="summary-total">{formatPrice(totalPrice)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
