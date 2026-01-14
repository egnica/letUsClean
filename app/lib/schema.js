// lib/schema.js
const SITE = {
  name: "Let Us Clean MN",
  url: "https://www.letuscleanmn.com/",
  logo: "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.png",
  phone: "+1-612-991-2832",
  email: "info@letuscleanmn.com",

  sameAs: [
    // e.g. Google Business Profile, Facebook, Instagram
    // "https://maps.google.com/?cid=YOUR_GBP_CID",
    "https://www.facebook.com/profile.php?id=61566621594891",
    // "https://www.instagram.com/letuscleanmn"
  ],
  // optional postal address (recommended for LocalBusiness)
  address: {
    streetAddress: "", // leave empty if you’re service-area only
    addressLocality: "Ham Lake",
    addressRegion: "MN",
    postalCode: "",
    addressCountry: "US",
  },
  // if you’re service-area only, define a polygon or named areas instead of a street.
  area: [
    "Minneapolis",
    "St. Paul",
    "Hennepin County",
    "Ramsey County",
    "Dakota County",
    "Anoka County",
    "Washington County",
    "Scott County",
    "Carver County",
  ],

  openingHours: [
    // "Mo-Fr 09:00-17:00", "Sa 10:00-14:00"
  ],
};

export { SITE };

export function twinCitiesGeoCircle(radiusKm = 50) {
  return {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 44.9778, // roughly downtown Minneapolis
      longitude: -93.265,
    },
    geoRadius: `${radiusKm} km`,
  };
}

export function serviceSchema(svc) {
  const serviceType = svc.schemaServiceType || svc.shortTitle || svc.title;
  const area =
    svc.cityTarget && svc.cityTarget.length ? svc.cityTarget : SITE.area;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${
      svc.slug || svc.title.toLowerCase().replace(/\s+/g, "-")
    }`,
    name: svc.title,
    description: svc.blurb,
    serviceType,
    areaServed: area,
    provider: {
      "@id": `${SITE.url}#localbusiness`,
    },
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
export function websiteSchema({ url, name }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
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

export function localBusinessSchema({
  name = SITE.name,
  url = SITE.url,
  logo = SITE.logo,
  telephone = SITE.phone,
  email = SITE.email,
  sameAs = SITE.sameAs,
  address = SITE.address,
  openingHours = SITE.openingHours,
  areaServed = SITE.area,
  serviceAreaGeo,
}) {
  const node = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name,
    url,
    image: logo,
    logo,
    telephone,
    email,
    areaServed,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone,
        email,
        contactType: "customer service",
        areaServed: "US-MN",
        availableLanguage: ["English"],
      },
    ],
  };

  if (address && (address.addressLocality || address.streetAddress)) {
    node.address = { "@type": "PostalAddress", ...address };
  }

  if (openingHours?.length) node.openingHours = openingHours;
  if (sameAs?.length) node.sameAs = sameAs;

  if (serviceAreaGeo) {
    node.areaServed = [
      ...(Array.isArray(areaServed) ? areaServed : [areaServed]),
      {
        "@type": "Place",
        name: "Twin Cities Metro",
        geo: serviceAreaGeo,
      },
    ];
  }

  return node;
}

// NEW: Person (for founders)
export function personSchema({ name, jobTitle, image, sameAs = [] }) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
  };
  if (jobTitle) node.jobTitle = jobTitle;
  if (image) node.image = image;
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}
