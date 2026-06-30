export default function Schema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OmniDataX",
      url: "https://www.omnidatax.com",
      logo: "https://www.omnidatax.com/og-image.png",
      email: "admin@omnidatax.com",
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