export function formatPrice(value) {
  const number = Number(value || 0);
  return `${new Intl.NumberFormat("az-AZ").format(number)} AZN`;
}

export function formatCondition(condition) {
  return condition === "new" ? "Yeni" : "İşlənmiş";
}

export function truncateText(text, limit = 90) {
  if (!text) return "";
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trim()}...`;
}
