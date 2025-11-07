import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Script from "next/script";
import Footer from "./components/footer";
import { SITE, organizationSchema, websiteSchema } from "./lib/schema";

export const metadata = {
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
    canonical: "https://www.letuscleanmn.com/",
  },
  openGraph: {
    title: "Let Us Clean MN | Trusted Cleaning Services in Minneapolis, MN",
    description:
      "Locally owned and operated cleaning company offering residential and commercial cleaning services throughout Minneapolis and nearby areas. Schedule your next cleaning today!",
    url: "https://letuscleanmn.com/",
    siteName: "Let Us Clean MN",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let Us Clean MN | Minneapolis Cleaning Services",
    description:
      "Professional house and office cleaning in Minneapolis, MN. Locally owned, affordable, and reliable. Book online today!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const globalSchemas = [
    organizationSchema({
      name: SITE.name,
      url: SITE.url,
      logo: SITE.logo,
      sameAs: SITE.sameAs,
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
        <meta name="keywords" content={metadata.keywords.join(", ")} />
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
