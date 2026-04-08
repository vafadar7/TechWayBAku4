import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  buildProductInquiryMessage,
  generateWhatsAppUrl,
  hasValidWhatsAppNumber,
} from "../utils/whatsapp";
import { formatCondition, formatPrice } from "../utils/format";

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61H19a2 2 0 001.98-1.71L23 6H6" />
    </svg>
  );
}

export default function ProductDetails({ products, onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.mainImage || "");

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (item) =>
          item.slug !== product.slug &&
          (item.brand === product.brand || item.category === product.category)
      )
      .slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <div className="card empty-state">
            <h2>Məhsul tapılmadı</h2>
            <p className="section-text">Axtardığın məhsul mövcud deyil.</p>
            <Link to="/products" className="btn btn-primary">
              Məhsullara qayıt
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const gallery = Array.from(
    new Set([product.mainImage, ...(product.gallery || [])].filter(Boolean))
  );
  const currentImage = selectedImage || product.mainImage;

  const handleAddToCart = () => {
    if (Number(product.stock) <= 0) return;
    onAddToCart?.(product, quantity);
    navigate("/cart");
  };

  const handleWhatsApp = () => {
    if (!hasValidWhatsAppNumber()) {
      alert("WhatsApp nömrəsi düzgün qurulmayıb.");
      return;
    }
    const url = generateWhatsAppUrl(buildProductInquiryMessage(product));
    window.location.href = url;
  };

  const increase = () =>
    setQuantity((c) => Math.min(product.stock || 99, c + 1));
  const decrease = () => setQuantity((c) => Math.max(1, c - 1));

  return (
    <section className="section">
      <div className="container">
        <Link
          to="/products"
          className="small muted"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 16,
          }}
        >
          ← Məhsullara qayıt
        </Link>

        <div className="details-grid">
          {/* Şəkil hissəsi */}
          <div className="card detail-img-card">
            <img src={currentImage} alt={product.name} className="main-img" />
            {gallery.length > 1 && (
              <div className="gallery-strip">
                {gallery.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt={product.name}
                    className={`thumb ${
                      (selectedImage || product.mainImage) === img
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Məlumat hissəsi */}
          <div>
            <div className="product-meta" style={{ marginBottom: 12 }}>
              <span className="badge badge-neutral">{product.brand}</span>
              <span className="badge badge-accent">{product.category}</span>
              <span
                className={`badge ${
                  product.condition === "new" ? "badge-accent" : "badge-warning"
                }`}
              >
                {formatCondition(product.condition)}
              </span>
              {product.featured && (
                <span className="badge badge-featured">Seçilmiş</span>
              )}
            </div>

            <h1 className="detail-title">{product.name}</h1>

            {/* Qiymət + Səbət ikonu */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <div className="product-price" style={{ fontSize: 26 }}>
                  {formatPrice(product.price)}
                </div>
                {product.oldPrice && (
                  <div className="old-price">
                    {formatPrice(product.oldPrice)}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Miqdar */}
                <div className="qty-control">
                  <button type="button" onClick={decrease} aria-label="Azalt">
                    −
                  </button>
                  <span>{quantity}</span>
                  <button type="button" onClick={increase} aria-label="Artır">
                    +
                  </button>
                </div>

                {/* Qırmızı səbət ikonu */}
                <button
                  type="button"
                  className="cart-icon-btn"
                  style={{ width: 46, height: 46, borderRadius: 12 }}
                  onClick={handleAddToCart}
                  disabled={Number(product.stock) <= 0}
                  aria-label="Səbətə əlavə et"
                >
                  <CartIcon />
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span
                className={`stock-dot ${
                  Number(product.stock) > 0 ? "in-stock" : "out-stock"
                }`}
              >
                {Number(product.stock) > 0
                  ? `Stokda var (${product.stock})`
                  : "Stokda yoxdur"}
              </span>
            </div>

            {product.fullDescription && (
              <p className="section-text" style={{ marginBottom: 16 }}>
                {product.fullDescription}
              </p>
            )}

            <ul className="detail-list" style={{ marginBottom: 20 }}>
              <li>
                <span>Marka</span>
                <strong>{product.brand}</strong>
              </li>
              <li>
                <span>Kateqoriya</span>
                <strong>{product.category}</strong>
              </li>
              <li>
                <span>Vəziyyət</span>
                <strong>{formatCondition(product.condition)}</strong>
              </li>
              {product.warranty && (
                <li>
                  <span>Zəmanət</span>
                  <strong>{product.warranty}</strong>
                </li>
              )}
            </ul>

            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h2
                    className="section-title"
                    style={{ marginBottom: 10, fontSize: "1rem" }}
                  >
                    Xüsusiyyətlər
                  </h2>
                  <ul className="detail-list">
                    {Object.entries(product.specifications).map(([k, v]) => (
                      <li key={k}>
                        <span>{k}</span>
                        <strong>{v}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={handleWhatsApp}
            >
              WhatsApp ilə soruş
            </button>
          </div>
        </div>

        {/* Oxşar məhsullar */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 44 }}>
            <div className="section-head-between">
              <div>
                <h2 className="section-title" style={{ marginBottom: 6 }}>
                  Oxşar məhsullar
                </h2>
                <p className="section-text">
                  Brend və ya kateqoriyaya görə digər seçimlər.
                </p>
              </div>
            </div>
            <div className="product-grid">
              {relatedProducts.map((item) => (
                <article key={item.id} className="product-card">
                  <Link to={`/products/${item.slug}`}>
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="product-image"
                    />
                  </Link>
                  <div className="product-body">
                    <div className="product-meta">
                      <span className="badge badge-neutral">{item.brand}</span>
                    </div>
                    <h3 className="product-name">
                      <Link to={`/products/${item.slug}`}>{item.name}</Link>
                    </h3>
                    <div className="product-price-row">
                      <div className="price-group">
                        <div className="product-price">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
