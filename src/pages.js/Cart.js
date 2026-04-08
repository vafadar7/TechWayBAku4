import { Link } from "react-router-dom";
import { formatPrice, formatCondition } from "../utils/format";

export default function Cart({
  cartItems,
  totalPrice,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
}) {
  const handleRemove = (id) => {
    if (window.confirm("Bu məhsulu səbətdən silmək istəyirsən?")) {
      removeItem(id);
    }
  };

  const handleClear = () => {
    if (window.confirm("Bütün səbəti təmizləmək istəyirsən?")) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="card empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Səbət boşdur</h2>
            <p className="section-text">Hələ heç bir məhsul əlavə etməmisən.</p>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 className="page-title">Səbət</h1>
            <p className="section-text" style={{ marginTop: 6 }}>
              Məhsulları yoxla, miqdarı dəyiş və sifarişə keç.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Səbəti təmizlə
          </button>
        </div>

        <div className="cart-layout">
          {/* Məhsul siyahısı */}
          <div className="cart-list">
            {cartItems.map((item) => (
              <article key={item.id} className="card cart-item">
                {/* Şəkil */}
                <Link to={`/products/${item.slug}`}>
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="cart-item-img"
                  />
                </Link>

                {/* Məlumatlar */}
                <div className="cart-item-info">
                  <h3>
                    <Link to={`/products/${item.slug}`}>{item.name}</Link>
                  </h3>

                  <div className="product-meta">
                    <span className="badge badge-neutral">{item.brand}</span>
                    <span className="badge badge-accent">
                      {formatCondition(item.condition)}
                    </span>
                  </div>

                  <div className="small muted">
                    Vahid:{" "}
                    <strong style={{ color: "#111" }}>
                      {formatPrice(item.price)}
                    </strong>
                  </div>

                  <div className="small">
                    Cəmi:{" "}
                    <strong style={{ color: "#e11d48" }}>
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Azalt"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Artır"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    Sil
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Xülasə */}
          <aside className="card cart-summary">
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              Sifariş xülasəsi
            </h2>

            <div className="summary-row">
              <span>Məhsul sayı</span>
              <strong>{cartItems.reduce((s, i) => s + i.quantity, 0)}</strong>
            </div>

            <div className="summary-row">
              <span>Ara cəm</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <div className="summary-row">
              <span>Çatdırılma</span>
              <strong>Razılaşdırılır</strong>
            </div>

            <hr
              style={{
                border: 0,
                borderTop: "1px solid #e5e7eb",
                margin: "12px 0",
              }}
            />

            <div className="summary-row">
              <span className="summary-total">Cəmi</span>
              <span className="summary-total" style={{ color: "#e11d48" }}>
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <Link to="/checkout" className="btn btn-accent">
                Sifarişə keç
              </Link>
              <Link to="/products" className="btn btn-secondary">
                Alış-verişə davam et
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
