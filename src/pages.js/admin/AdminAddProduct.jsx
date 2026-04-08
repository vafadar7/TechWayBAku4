import { useNavigate } from "react-router-dom";
import AdminProductForm from "./AdminProductForm";

export default function AdminAddProduct({ addProduct, products }) {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    addProduct(data);
    navigate("/admin/products");
  };

  return (
    <AdminProductForm
      title="Məhsul əlavə et"
      submitLabel="Məhsulu yarat"
      products={products}
      onSubmit={handleSubmit}
    />
  );
}
