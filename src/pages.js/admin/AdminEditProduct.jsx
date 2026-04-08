import { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminProductForm from "./AdminProductForm";

export default function AdminEditProduct({ products, updateProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((item) => String(item.id) === String(id)),
    [products, id]
  );

  if (!product) {
    return (
      <div className="card empty-state">
        <h2>Məhsul tapılmadı</h2>
        <p className="section-text">Bu məhsul mövcud deyil.</p>
        <Link to="/admin/products" className="btn btn-primary">
          Geri qayıt
        </Link>
      </div>
    );
  }

  const handleSubmit = (data) => {
    updateProduct(id, data);
    navigate("/admin/products");
  };

  return (
    <AdminProductForm
      title="Məhsulu redaktə et"
      submitLabel="Dəyişiklikləri yadda saxla"
      initialProduct={product}
      products={products}
      onSubmit={handleSubmit}
    />
  );
}
