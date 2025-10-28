
import "./globals.css";



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
    url: "https://www.letuscleanmn.com/",
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
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts embed link */}
        <link rel="stylesheet" href="https://use.typekit.net/zjf3nkl.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
