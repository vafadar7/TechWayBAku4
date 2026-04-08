import { useEffect, useMemo, useState } from "react";
import { fileToDataUrl } from "../../utils/file";
import { generateSlug } from "../../utils/slug";

const EMPTY = {
  name: "",
  slug: "",
  brand: "",
  category: "",
  condition: "new",
  price: "",
  oldPrice: "",
  currency: "AZN",
  warranty: "",
  stock: "0",
  ram: "",
  storage: "",
  shortDescription: "",
  fullDescription: "",
  specificationsText: "{\n}",
  featured: false,
  popular: false,
  status: "active",
  mainImage: "",
  gallery: [],
};

function toForm(p) {
  if (!p) return EMPTY;
  return {
    ...EMPTY,
    ...p,
    price: String(p.price ?? ""),
    oldPrice: p.oldPrice === "" || p.oldPrice == null ? "" : String(p.oldPrice),
    stock: String(p.stock ?? 0),
    ram: p.ram || "",
    storage: p.storage || "",
    specificationsText: JSON.stringify(p.specifications || {}, null, 2),
    gallery: Array.isArray(p.gallery) ? p.gallery : [],
    mainImage: p.mainImage || "",
    featured: Boolean(p.featured),
    popular: Boolean(p.popular),
  };
}

export default function AdminProductForm({
  title,
  submitLabel,
  initialProduct,
  onSubmit,
  products = [],
}) {
  const [form, setForm] = useState(toForm(initialProduct));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const brandSuggestions = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean))].sort(),
    [products]
  );

  const categorySuggestions = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))].sort(),
    [products]
  );

  const ramSuggestions = useMemo(
    () => [...new Set(products.map((p) => p.ram).filter(Boolean))].sort(),
    [products]
  );

  const storageSuggestions = useMemo(
    () => [...new Set(products.map((p) => p.storage).filter(Boolean))].sort(),
    [products]
  );

  useEffect(() => {
    setForm(toForm(initialProduct));
  }, [initialProduct]);

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const handleMainImg = async (file) => {
    if (!file) return;
    set("mainImage", await fileToDataUrl(file));
  };

  const handleGallery = async (files) => {
    if (!files?.length) return;
    const urls = await Promise.all([...files].map(fileToDataUrl));
    set("gallery", urls);
    if (!form.mainImage && urls[0]) set("mainImage", urls[0]);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Ad tələb olunur";
    if (!form.brand.trim()) e.brand = "Marka tələb olunur";
    if (!form.category.trim()) e.category = "Kateqoriya tələb olunur";
    if (!form.price) e.price = "Qiymət tələb olunur";
    if (!form.mainImage.trim()) e.mainImage = "Əsas şəkil tələb olunur";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    let specifications = {};
    try {
      const txt = form.specificationsText.trim();
      specifications = txt ? JSON.parse(txt) : {};
      if (!specifications || Array.isArray(specifications)) throw new Error();
    } catch {
      setErrors({ specifications: "JSON formatında olmalıdır" });
      return;
    }

    setSaving(true);
    await onSubmit({
      ...form,
      slug: form.slug.trim() || generateSlug(form.name),
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice === "" ? "" : Number(form.oldPrice),
      stock: Number(form.stock) || 0,
      ram: form.ram.trim(),
      storage: form.storage.trim(),
      specifications,
      gallery: Array.isArray(form.gallery) ? form.gallery : [],
      mainImage: form.mainImage || form.gallery?.[0] || "",
      featured: Boolean(form.featured),
      popular: Boolean(form.popular),
    });
    setSaving(false);
  };

  const Field = ({ label, error, children }) => (
    <div>
      <label className="filter-label">{label}</label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );

  return (
    <form className="card admin-form" onSubmit={handleSubmit}>
      <h1 className="section-title">{title}</h1>
      <p className="section-text" style={{ marginBottom: 22 }}>
        Məhsul məlumatlarını doldur, şəkilləri yüklə və yadda saxla.
      </p>

      {/* ── Əsas məlumatlar ── */}
      <div className="form-section">
        <h3 className="form-section-title">Əsas məlumatlar</h3>

        <div className="form-row-2">
          <Field label="Ad *" error={errors.name}>
            <input
              className="input"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="iPhone 13"
            />
          </Field>

          <Field label="Slug">
            <div className="slug-row">
              <input
                className="input"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="iphone-13"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => set("slug", generateSlug(form.name))}
              >
                Avto
              </button>
            </div>
          </Field>
        </div>

        <div className="form-row-2">
          <Field label="Marka *" error={errors.brand}>
            <input
              className="input"
              list="brand-list"
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="Apple"
            />
            <datalist id="brand-list">
              {brandSuggestions.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
            <p className="field-hint">
              Mövcud markalardan seçin və ya yenisini yazın.
            </p>
          </Field>

          <Field label="Kateqoriya *" error={errors.category}>
            <input
              className="input"
              list="cat-list"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="iPhone"
            />
            <datalist id="cat-list">
              {categorySuggestions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <p className="field-hint">
              Mövcud kateqoriyalardan seçin və ya yenisini yazın.
            </p>
          </Field>
        </div>

        <div className="form-row-3">
          <Field label="Vəziyyət">
            <select
              className="select"
              value={form.condition}
              onChange={(e) => set("condition", e.target.value)}
            >
              <option value="new">Yeni</option>
              <option value="used">İşlənmiş</option>
            </select>
          </Field>

          <Field label="Status">
            <select
              className="select"
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="active">Aktiv</option>
              <option value="inactive">Deaktiv</option>
            </select>
          </Field>

          <Field label="Zəmanət">
            <input
              className="input"
              value={form.warranty}
              onChange={(e) => set("warranty", e.target.value)}
              placeholder="1 il zəmanət"
            />
          </Field>
        </div>
      </div>

      {/* ── Texniki xüsusiyyətlər ── */}
      <div className="form-section">
        <h3 className="form-section-title">Texniki xüsusiyyətlər</h3>

        <div className="form-row-3">
          <Field label="Operativ yaddaş (RAM)">
            <input
              className="input"
              list="ram-list"
              value={form.ram}
              onChange={(e) => set("ram", e.target.value)}
              placeholder="8GB"
            />
            <datalist id="ram-list">
              {ramSuggestions.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </Field>

          <Field label="Daxili yaddaş">
            <input
              className="input"
              list="storage-list"
              value={form.storage}
              onChange={(e) => set("storage", e.target.value)}
              placeholder="256GB"
            />
            <datalist id="storage-list">
              {storageSuggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Field>

          <Field label="Stok">
            <input
              className="input"
              type="number"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              placeholder="5"
            />
          </Field>
        </div>

        <div>
          <label className="filter-label">Xüsusiyyətlər (JSON)</label>
          <textarea
            className="textarea"
            style={{ minHeight: 130 }}
            value={form.specificationsText}
            onChange={(e) => set("specificationsText", e.target.value)}
            placeholder={'{\n  "Yaddaş": "128GB",\n  "Ekran": "6.1\\""\n}'}
          />
          {errors.specifications && (
            <p className="field-error">{errors.specifications}</p>
          )}
        </div>
      </div>

      {/* ── Qiymət ── */}
      <div className="form-section">
        <h3 className="form-section-title">Qiymət</h3>

        <div className="form-row-2">
          <Field label="Cari qiymət (AZN) *" error={errors.price}>
            <input
              className="input"
              type="number"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="1399"
            />
          </Field>

          <Field label="Köhnə qiymət (AZN)">
            <input
              className="input"
              type="number"
              value={form.oldPrice}
              onChange={(e) => set("oldPrice", e.target.value)}
              placeholder="1599"
            />
          </Field>
        </div>
      </div>

      {/* ── Açıqlamalar ── */}
      <div className="form-section">
        <h3 className="form-section-title">Açıqlamalar</h3>

        <Field label="Qısa açıqlama">
          <textarea
            className="textarea"
            value={form.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
            placeholder="Məhsulun qısa təsviri (kart altında görünür)"
          />
        </Field>

        <Field label="Tam açıqlama">
          <textarea
            className="textarea"
            value={form.fullDescription}
            onChange={(e) => set("fullDescription", e.target.value)}
            placeholder="Məhsul haqqında geniş məlumat"
          />
        </Field>
      </div>

      {/* ── Şəkillər ── */}
      <div className="form-section">
        <h3 className="form-section-title">Şəkillər</h3>

        <div className="form-row-2">
          <div className="upload-box">
            <div className="upload-label">Əsas şəkil yüklə *</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleMainImg(e.target.files?.[0])}
            />
            {errors.mainImage && (
              <p className="field-error">{errors.mainImage}</p>
            )}
          </div>

          <div className="upload-box">
            <div className="upload-label">Qalereya şəkilləri</div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleGallery(e.target.files)}
            />
          </div>
        </div>

        {form.mainImage && (
          <div>
            <p className="filter-label">Əsas şəkil önizləmə</p>
            <img
              src={form.mainImage}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: 280,
                objectFit: "cover",
                borderRadius: 18,
              }}
            />
          </div>
        )}

        {form.gallery?.length > 0 && (
          <div>
            <p className="filter-label">Qalereya önizləmə</p>
            <div className="gallery-preview">
              {form.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery-${i}`}
                  className="gallery-thumb"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Əlavə seçimlər ── */}
      <div className="form-section">
        <h3 className="form-section-title">Əlavə seçimlər</h3>

        <div className="check-row">
          <label className="check-label">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Seçilmiş məhsul
          </label>

          <label className="check-label">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => set("popular", e.target.checked)}
            />
            Məşhur məhsul
          </label>
        </div>
      </div>

      <div className="form-submit">
        <button type="submit" className="btn btn-accent" disabled={saving}>
          {saving ? "Yadda saxlanılır..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
