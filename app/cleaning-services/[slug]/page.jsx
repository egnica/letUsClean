//Slug page for actual service
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
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((x) => x.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Let Us Clean MN`,
    description: service.blurb,
  };
}

export default function ServicePage({ params }) {
  const service = services.find((x) => x.slug === params.slug);
  if (!service) return notFound();

  const schemas = [
    webPageSchema({
      name: service.title,
      description: service.blurb,
      url: `https://letuscleanmn.com/cleaning-services/${service.slug}`, // ← update domain
    }),
    serviceSchema(service),
    faqSchema(service.faq),
    breadcrumbSchema([
      { name: "Home", url: "https://letuscleanmn.com/" },
      {
        name: "Cleaning Services",
        url: "https://letuscleanmn.com/cleaning-services",
      },
      {
        name: service.shortTitle || service.title,
        url: `https://letuscleanmn.com/cleaning-services/${service.slug}`,
      },
    ]),
  ].filter(Boolean);

  const quoteHref = `/quote?service=${encodeURIComponent(service.slug)}`;

  return (
    <main>
      <nav>
        <Link href="/cleaning-services">← All Services</Link>
      </nav>

      <h1>{service.title}</h1>
      <p>{service.blurb}</p>

      {service.includes?.length ? (
        <section>
          <h2>What’s included</h2>
          <ul>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {service.addOns?.length ? (
        <section>
          <h2>Popular add-ons</h2>
          <ul>
            {service.addOns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {service.faq?.length ? (
        <section>
          <h2>FAQs</h2>
          <div>
            {service.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {service.cityTarget?.length ? (
        <section>
          <h2>Service area</h2>
          <p>{service.cityTarget.join(", ")}</p>
        </section>
      ) : null}

      <div>
        <Link href={quoteHref}>{service.ctaLabel || "Get Quote"}</Link>
      </div>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schemas)}
      </script>
    </main>
  );
}
