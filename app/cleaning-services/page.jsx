import services from "../data/services.json";
import Link from "next/link";
import Image from "next/image";
import { breadcrumbSchema, webPageSchema } from "../lib/schema";

export const metadata = {
  title: "Cleaning Services in Minneapolis & St. Paul | Let Us Clean MN",
  description:
    "House cleaning, move-out cleaning, office cleaning, and post-construction cleaning across the Twin Cities.",
};

export default function CleaningServicesPage() {
  const schemas = [
    webPageSchema({
      name: "Cleaning Services in Minneapolis & St. Paul",
      description: metadata.description,
      url: "https://letuscleanmn.com/cleaning-services", // ← update domain
    }),
    breadcrumbSchema([
      { name: "Home", url: "https://letuscleanmn.com/" },
      {
        name: "Cleaning Services",
        url: "https://letuscleanmn.com/cleaning-services",
      },
    ]),
  ];

  return (
    <main >
      <header>
        <h1 >
          Cleaning Services in Minneapolis & St. Paul
        </h1>
        <p >
          Locally owned & insured. Eco-friendly products. Flexible scheduling.
        </p>
      </header>

      <section >
        {services.map((s) => {
          const quoteHref = `/quote?service=${encodeURIComponent(s.slug)}`;
          const detailsHref = `/cleaning-services/${s.slug}`;
          return (
            <article
              key={s.slug}
            
            >
              {s.image && (
                <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden"></div>
              )}
              <h2 className="text-xl font-semibold">
                {s.shortTitle || s.title}
              </h2>
              {s.tagline && (
                <p className="text-sm text-neutral-600">{s.tagline}</p>
              )}
              <p className="mt-2">{s.blurb}</p>

              <div className="mt-auto flex gap-3 pt-4">
                <Link
                  href={quoteHref}
                  className="inline-block rounded-lg px-4 py-2 border bg-black text-white"
                >
                  {s.ctaLabel || "Get Quote"}
                </Link>
                <Link
                  href={detailsHref}
                  className="inline-block rounded-lg px-4 py-2 border"
                >
                  Learn more
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schemas)}
      </script>
    </main>
  );
}
