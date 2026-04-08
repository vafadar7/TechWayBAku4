export function generateSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0400-\u04FF\u0600-\u06FF]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
