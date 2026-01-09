import {
  webPageSchema,
  breadcrumbSchema,
  localBusinessSchema,
  twinCitiesGeoCircle,
  SITE,
} from "../lib/schema";
import Nav from "../components/nav";
import styles from "../page.module.css";
export const metadata = {
  title: "About Let Us Clean MN | Professional Cleaning Services in Minnesota",
  description:
    "Meet Ashley and Chelsea — founders of Let Us Clean MN, serving the entire Twin Cities metro.",
};

export default function AboutPage() {
  const schemas = [
    webPageSchema({
      name: "About Let Us Clean MN",
      description: metadata.description,
      url: `${SITE.url}/about`,
    }),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "About", url: `${SITE.url}/about` },
    ]),
    localBusinessSchema({
      serviceAreaGeo: twinCitiesGeoCircle(55),
    }),
  ];

  return (
    <main>
      <Nav />
      <div className={styles.aboutMain}>
        <h1>About Let Us Clean MN</h1>
        <div className={styles.aboutTwoGrid}>
          <p>
            Ashley and Chelsea’s story began long before Let Us Clean was
            founded. The two first met in middle school, took separate paths in
            life, and eventually reconnected years later through mutual friends.
            At the time, Chelsea was working as an elementary school secretary,
            and Ashley had built years of experience providing professional
            cleaning services across Minnesota.
            <br />
            <br />
            In 2024, they decided to take a leap of faith, combining Ashley’s
            expertise and Chelsea’s organization skills to create Let Us Clean
            MN. What started as a small idea quickly grew into a trusted name in
            the Twin Cities cleaning community. Within their first year, the
            business saw a 500% increase in clients, including partnerships with
            residential homeowners, small businesses, and even a premier local
            wedding venue.
            <br />
            <br />
            Today, Let Us Clean MN is built on three simple values: consistency,
            reliability, and trust. Whether you need a one-time deep clean or
            ongoing service for your home or business, our goal is to make your
            space shine and to give you peace of mind knowing it’s in good
            hands.
            <br />
            <br />
            <strong> Let Us Clean… so you don’t have to!</strong>
          </p>
          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/letsusclead-owners.webp"
            alt="Two owners of Lets Us Clean MN"
          />
        </div>

        <div className={styles.aboutThreeGrid}>
          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/cleanSpace-5.webp"
            alt="Picture of clean room 1"
          />
          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/cleanSpace-2.WEBP"
            alt="Picture of clean room 2"
          />
          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/cleanSpace-3.webp"
            alt="Picture of clean room 3"
          />
        </div>
      </div>

      {/* JSON-LD added right to this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    </main>
  );
}
