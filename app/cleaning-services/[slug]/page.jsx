import services from "../../data/services.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/schema";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: `${s.title} | Let Us Clean MN`,
    description: s.blurb,
  };
}

export default function ServicePage({ params }) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  const schemas = [
    webPageSchema({
      name: s.title,
      description: s.blurb,
      url: `https://letuscleanmn.com/cleaning-services/${s.slug}`, // ← update domain
    }),
    serviceSchema(s),
    faqSchema(s.faq),
    breadcrumbSchema([
      { name: "Home", url: "https://letuscleanmn.com/" },
      {
        name: "Cleaning Services",
        url: "https://letuscleanmn.com/cleaning-services",
      },
      {
        name: s.shortTitle || s.title,
        url: `https://letuscleanmn.com/cleaning-services/${s.slug}`,
      },
    ]),
  ].filter(Boolean);

  const quoteHref = `/quote?service=${encodeURIComponent(s.slug)}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 text-sm">
        <Link href="/cleaning-services" className="underline">
          ← All Services
        </Link>
      </nav>

      <h1 className="text-3xl font-bold">{s.title}</h1>
      <p className="mt-2 text-neutral-700">{s.blurb}</p>

      {s.includes?.length ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">What’s included</h2>
          <ul className="mt-2 list-disc pl-6">
            {s.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {s.addOns?.length ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Popular add-ons</h2>
          <ul className="mt-2 list-disc pl-6">
            {s.addOns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {s.faq?.length ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">FAQs</h2>
          <div className="mt-2 space-y-3">
            {s.faq.map((f) => (
              <details key={f.q}>
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-1">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {s.cityTarget?.length ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Service area</h2>
          <p className="mt-2">{s.cityTarget.join(", ")}</p>
        </section>
      ) : null}

      <div className="mt-8">
        <Link
          href={quoteHref}
          className="inline-block rounded-lg px-5 py-3 border bg-black text-white"
        >
          {s.ctaLabel || "Get Quote"}
        </Link>
      </div>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schemas)}
      </script>
    </main>
  );
}
