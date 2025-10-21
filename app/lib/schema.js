// lib/schema.js
const SITE = {
  name: "Let Us Clean MN",
  url: "https://letuscleanmn.com", // ← update
  logo: "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp",
  area: ["Minneapolis", "St. Paul", "Twin Cities"],
  phone: "+1-612-991-2832",
};

export function serviceSchema(svc) {
  const serviceType = svc.schemaServiceType || svc.shortTitle || svc.title;
  const area =
    svc.cityTarget && svc.cityTarget.length ? svc.cityTarget : SITE.area;

  const offerCatalog =
    (svc.includes && svc.includes.length) || (svc.addOns && svc.addOns.length)
      ? {
          "@type": "OfferCatalog",
          name: "Cleaning Packages & Add-ons",
          itemListElement: [
            ...(svc.includes || []).map((name) => ({ "@type": "Offer", name })),
            ...(svc.addOns || []).map((name) => ({ "@type": "Offer", name })),
          ],
        }
      : undefined;

  const offers =
    typeof svc.priceFrom === "number"
      ? {
          "@type": "Offer",
          price: svc.priceFrom,
          priceCurrency: "USD",
          url: `${SITE.url}/cleaning-services/${svc.slug}`,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.blurb,
    serviceType,
    areaServed: area,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      url: SITE.url,
      image: SITE.logo,
      telephone: SITE.phone,
    },
    hasOfferCatalog: offerCatalog,
    offers,
  };
}

export function faqSchema(faq) {
  if (!faq || !faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function webPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
  };
}
