//Slug page for actual service
import services from "../../data/services.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/nav";
import styles from "../../page.module.css";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/schema";

export async function generateStaticParams() {
  return await services.map((service) => ({ slug: service.slug }));
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
      url: `https://letuscleanmn.com/cleaning-services/${service.slug}`,
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
    <main className={styles.serviceMain}>
      <div className={styles.colorOverlay}></div>
      <Nav />
      <nav>
        <Link href="/cleaning-services">← All Services</Link>
      </nav>
      <div className={styles.servicePageCont}>
        <div className={styles.splitSections}>
          <div className={styles.upperService}>
            <h1>{service.title}</h1>
            <h3>{service.tagline}</h3>
            <p>{service.blurb}</p>
          </div>
          <img src={service.image} />
        </div>
        <div className={styles.splitSections}>
          {service.includes?.length ? (
            <section>
              <h2>What’s included</h2>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <br />
              <a
                href="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/+Cleaning_Checklist.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={styles.heroButton}
                  style={{ maxWidth: "150px", textAlign: "center" }}
                >
                  Cleaning Checklist
                </div>
              </a>
            </section>
          ) : null}

          {service.slug.length ? (
            <section>
              <h2>Popular add-ons</h2>
              <ul>
                {service.addOns.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {service.slug == "residential-cleaning" && (
                <>
                  <p>
                    Detailed List at: <br />
                  </p>
                  <a
                    href="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/Preparing.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className={styles.heroButton}
                      style={{ maxWidth: "150px", textAlign: "center" }}
                    >
                      Preparing Checklist
                    </div>
                  </a>
                </>
              )}
            </section>
          ) : null}
        </div>
        {service.faq?.length ? (
          <section>
            <h2>FAQs</h2>
            <div>
              {service.faq.map((f) => (
                <details className={styles.question} key={f.q}>
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
          <Link style={{ color: "blue" }} href={"../../contact"}>
            {service.ctaLabel || "Get Quote"}
          </Link>
        </div>
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schemas)}
      </script>
    </main>
  );
}
