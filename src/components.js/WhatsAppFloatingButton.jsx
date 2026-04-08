import siteData from "../data.js/siteData";
import { generateWhatsAppUrl, hasValidWhatsAppNumber } from "../utils/whatsapp";

export default function WhatsAppFloatingButton() {
  const handleClick = () => {
    if (!hasValidWhatsAppNumber()) {
      alert(
        "WhatsApp nömrəsi düzgün qurulmayıb. siteData.js daxilində 994XXXXXXXXX formatından istifadə et."
      );
      return;
    }
    const url = generateWhatsAppUrl(`Salam, ${siteData.businessName}!`);
    window.location.href = url;
  };

  return (
    <button
      type="button"
      className="whatsapp-floating"
      onClick={handleClick}
      aria-label="WhatsApp"
      title={siteData.phone}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={{ width: "35px", height: "35px" }}
      />
    </button>
  );
}
