import {
  COMPANY_EMAIL,
  COMPANY_GITHUB,
  COMPANY_LINKEDIN,
} from "@/lib/constants";

export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OmniDataX",
    url: "https://www.omnidatax.com",
    logo: "https://www.omnidatax.com/og-image.png",
    email: COMPANY_EMAIL,
    sameAs: [COMPANY_LINKEDIN, COMPANY_GITHUB],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
