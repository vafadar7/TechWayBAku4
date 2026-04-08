import siteData from "../data.js/siteData";
import { formatCondition, formatPrice } from "./format";

export function normalizeWhatsAppNumber(raw) {
  if (!raw) return "";
  const digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("994") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10)
    return `994${digits.slice(1)}`;
  if (digits.length === 9) return `994${digits}`;
  return digits;
}

export function hasValidWhatsAppNumber() {
  const normalized = normalizeWhatsAppNumber(siteData.whatsappNumber);
  return /^994\d{9}$/.test(normalized);
}

export function generateWhatsAppUrl(message) {
  const normalized = normalizeWhatsAppNumber(siteData.whatsappNumber);
  const text = encodeURIComponent(message || "");
  const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );
  if (isMobile) {
    return `https://wa.me/${normalized}?text=${text}`;
  }
  return `https://web.whatsapp.com/send?phone=${normalized}&text=${text}`;
}

export function buildProductInquiryMessage(product) {
  return [
    `Salam, ${siteData.businessName}!`,
    "",
    "Bu məhsul haqqında məlumat istəyirəm:",
    "",
    `Məhsul: ${product.name}`,
    `Qiymət: ${formatPrice(product.price)}`,
    `Vəziyyət: ${formatCondition(product.condition)}`,
    `Brand: ${product.brand}`,
    `Kateqoriya: ${product.category}`,
    "",
    "Təşəkkür edirəm!",
  ].join("\n");
}

export function buildWhatsAppMessage(cartItems, customerData) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const itemLines = cartItems.map((item, index) => {
    const lineTotal = Number(item.price || 0) * Number(item.quantity || 0);
    return [
      `${index + 1}. ${item.name}`,
      `Say: ${item.quantity}`,
      `Vahid qiymət: ${formatPrice(item.price)}`,
      `Cəmi: ${formatPrice(lineTotal)}`,
    ].join("\n");
  });

  return [
    `Salam, ${siteData.businessName}!`,
    "",
    "Yeni sifariş:",
    "",
    `Ad Soyad: ${customerData.fullName || "-"}`,
    `Telefon: ${customerData.phone || "-"}`,
    `Ünvan: ${customerData.address || "-"}`,
    customerData.city ? `Şəhər: ${customerData.city}` : null,
    "",
    "Məhsullar:",
    ...itemLines,
    "",
    `Ümumi məbləğ: ${formatPrice(total)}`,
    customerData.note ? `Qeyd: ${customerData.note}` : null,
    "",
    "Təşəkkür edirəm!",
  ]
    .filter(Boolean)
    .join("\n");
}
