import "./globals.css";

import Script from "next/script";
import Footer from "./components/footer";
import {
  SITE,
  websiteSchema,
  localBusinessSchema,
  twinCitiesGeoCircle,
} from "./lib/schema";

export const metadata = {
  metadataBase: new URL("https://letuscleanmn.com"),
  title:
    "Let Us Clean MN | Residential & Commercial Cleaning in Minneapolis, MN",
  description:
    "Let Us Clean MN is a locally owned cleaning company providing professional house cleaning, apartment cleaning, and office cleaning services throughout Minneapolis and the Twin Cities area. Affordable rates, trusted cleaners, and spotless results—book your cleaning today!",
  keywords: [
    "cleaning services Minneapolis",
    "house cleaning Minneapolis",
    "office cleaning Minneapolis",
    "maid service Minneapolis",
    "Let Us Clean MN",
    "cleaning company Twin Cities",
  ],
  alternates: {
    canonical: "https://letuscleanmn.com/",
  },
  openGraph: {
    title: "Let Us Clean MN | Trusted Cleaning Services in Minneapolis, MN",
    description:
      "Locally owned and operated cleaning company offering residential and commercial cleaning services throughout Minneapolis and nearby areas. Schedule your next cleaning today!",
    url: "https://letuscleanmn.com/",
    siteName: "Let Us Clean MN",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/meta_image-letusclean.jpg",
        width: 1200,
        height: 630,
        alt: "Let Us Clean MN - Professional Cleaning Services in Minneapolis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let Us Clean MN | Minneapolis Cleaning Services",
    description:
      "Professional house and office cleaning in Minneapolis, MN. Locally owned, affordable, and reliable. Book online today!",
    images: [
      "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/meta_image-letusclean.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const globalSchemas = [
    localBusinessSchema({
      serviceAreaGeo: twinCitiesGeoCircle(50),
    }),
    websiteSchema({
      url: SITE.url,
      name: SITE.name,
    }),
  ];

  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts embed link */}
        <link rel="stylesheet" href="https://use.typekit.net/zjf3nkl.css" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <footer>
          <Footer />
        </footer>
        <Script
          id="global-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemas) }}
        />
      </body>
    </html>
  );
}
