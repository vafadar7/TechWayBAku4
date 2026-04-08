import siteData from "../data.js/siteData";
import { generateWhatsAppUrl, hasValidWhatsAppNumber } from "../utils/whatsapp";

export default function Contact() {
  const handleWhatsApp = () => {
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
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 18 }}>
          <h1 className="page-title">Əlaqə</h1>
          <p className="section-text" style={{ marginTop: 10 }}>
            Bizimlə əlaqə saxla, suallarını yaz və ya WhatsApp-da danış.
          </p>
        </div>

        <div className="contact-grid">
          {/* Əsas məlumatlar */}
          <div className="card contact-item">
            <h2 className="section-title">Əsas məlumatlar</h2>
            <div className="grid" style={{ gap: 10 }}>
              <div>
                <strong>Telefon:</strong> {siteData.phone}
              </div>
              <div>
                <strong>WhatsApp:</strong> {siteData.whatsappNumber}
              </div>
              <div>
                <strong>Ünvan:</strong> {siteData.address}
              </div>
              {siteData.workingHours && (
                <div>
                  <strong>İş saatları:</strong> {siteData.workingHours}
                </div>
              )}
            </div>
          </div>

          {/* Xidmətlər */}
          <div className="card contact-item">
            <h2 className="section-title">Xidmətlər</h2>
            <p className="section-text">
              Rəsmi zəmanətli məhsullar, müxtəlif marka smartfonlar, telefon
              aksesuarları və gündəlik istifadə üçün xırda elektronika
              məhsulları.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div
            className="card contact-item"
            style={{ background: "#111827", color: "#fff", border: 0 }}
          >
            <h2 className="section-title" style={{ color: "#fff" }}>
              WhatsApp ilə əlaqə
            </h2>
            <p
              className="section-text"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Sifariş, qiymət sorğusu və ya məhsul haqqında məlumat üçün bizə
              WhatsApp-da yaza bilərsən.
            </p>
            <button
              type="button"
              className="btn btn-accent"
              onClick={handleWhatsApp}
            >
              WhatsApp-da yaz
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: 24, marginTop: 18 }}>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            TechWayBaku
          </h2>
          <p className="section-text">{siteData.businessDescription}</p>
        </div>
      </div>
    </section>
  );
}
