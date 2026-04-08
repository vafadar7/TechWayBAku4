import { Link, useNavigate } from "react-router-dom";
import { formatPrice, truncateText } from "../utils/format";

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

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (Number(product.stock) <= 0) return;
    onAddToCart?.(product, 1);
    navigate("/cart");
  };

  return (
    <article className="product-card">
      <Link
        to={`/products/${product.slug}`}
        className="product-img-link"
        aria-label={product.name}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.oldPrice && <span className="sale-badge">Endirim</span>}
        {product.condition === "used" && (
          <span className="used-badge">İşlənmiş</span>
        )}
      </Link>

      <div className="product-body">
        <div className="product-meta">
          <span className="badge badge-neutral">{product.brand}</span>
          {product.featured && (
            <span className="badge badge-featured">Seçilmiş</span>
          )}
        </div>

        <h3 className="product-name">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {(product.ram || product.storage) && (
          <div className="product-specs">
            {product.ram && (
              <span className="spec-chip">{product.ram} RAM</span>
            )}
            {product.storage && (
              <span className="spec-chip">{product.storage}</span>
            )}
          </div>
        )}

        {product.shortDescription && (
          <p className="product-desc">
            {truncateText(product.shortDescription, 80)}
          </p>
        )}

        {/* Qiymət + Səbət ikonu */}
        <div className="product-price-row">
          <div className="price-group">
            <div className="product-price">{formatPrice(product.price)}</div>
            {product.oldPrice && (
              <div className="old-price">{formatPrice(product.oldPrice)}</div>
            )}
          </div>

          <button
            type="button"
            className="cart-icon-btn"
            onClick={handleCartClick}
            disabled={Number(product.stock) <= 0}
            aria-label="Səbətə əlavə et"
            title={
              Number(product.stock) <= 0 ? "Stokda yoxdur" : "Səbətə əlavə et"
            }
          >
            <CartIcon />
          </button>
        </div>

        <div style={{ marginTop: 8 }}>
          <span
            className={`stock-dot ${
              Number(product.stock) > 0 ? "in-stock" : "out-stock"
            }`}
          >
            {Number(product.stock) > 0 ? "Stokda var" : "Stokda yox"}
          </span>
        </div>
      </div>
    </article>
  );
}
