"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import QuoteForm from "./components/QuoteForm";
import GoogleReviewsWidget from "./components/googleWidget";
import { MailIcon, PhoneIcon, FacebookIcon } from "lucide-react";
import {
  SITE,
  webPageSchema,
  localBusinessSchema,
  twinCitiesGeoCircle,
} from "./lib/schema";
// Adjust this path to where your file actually lives:
import services from "./data/services.json";

import Nav from "./components/nav";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function Home() {
  // Page-specific JSON-LD
  const schemas = [
    webPageSchema({
      name: "Home",
      // description: metadata.description,
      url: SITE.url,
    }),
    localBusinessSchema({
      serviceAreaGeo: twinCitiesGeoCircle(55),
      // openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-14:00"],
      // priceRange: "$$",
    }),
  ];

  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [changeIndex, setChangeIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "end 0.05"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["-35%", "35%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [1, 1] : [1.15, 1.05],
  );

  const imageArray = [
    "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean1.webp",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean2.webp",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean3.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeIndex((prev) => (prev + 1 >= imageArray.length ? 0 : prev + 1));
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <Nav />
      <main>
        <section ref={sectionRef} className={styles.mainSection}>
          <div className={styles.overlay} />
          <motion.img
            initial={{ opacity: 0.4, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            className={styles.imgOverlay}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/shape-cover.png"
            alt=""
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.img
              key={changeIndex}
              src={imageArray[changeIndex]}
              alt="Clean, organized living space in Minneapolis"
              className={styles.mainImage}
              style={{ y, scale }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
            />
          </AnimatePresence>

          <div className={styles.mainContent}>
            <div className={styles.heroText}>
              {/* ✅ Single H1 for SEO */}
              <h1 className={styles.mainh1}>Let Us Clean MN</h1>
              <h2 className={styles.secondh1}>
                Trusted Minneapolis House Cleaning Services
              </h2>
              <br />
              <br />
            </div>

            <div className={styles.twoBtn}>
              {/*Use buttons/links */}
              <a href="tel:+16129912832" className={styles.heroButton}>
                Book A Cleaning
              </a>
              <Link className={styles.heroButton} href="/contact">
                Free Quote
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.belowMain}>
          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/4PannelClean.webp"
            alt="Before and after cleaning panels"
          />
          <div className={styles.belowMainText}>
            <div style={{ margin: "auto" }}>
              <h2 className={styles.belowMainH2}>
                <strong style={{ color: "#7b5c8d" }}>Experience</strong> a
                cleaner, stress-free{" "}
                <strong style={{ color: "#deb344" }}>environment.</strong>
              </h2>
              <p className={styles.lead}>
                A locally owned cleaning company serving homes and small
                businesses across the Twin Cities. From one-time deep cleans to
                regular maintenance plans, our team makes your space shine so
                you can spend time on what matters most.
              </p>
            </div>
          </div>
        </section>
        <GoogleReviewsWidget />
        <section className={styles.servicesCont}>
          <div className={styles.servicesTitle}>
            <h2 className={styles.belowMainH2}>
              Let Us Clean MN Cleaning Services
            </h2>
            <p>Qualified professionals for each service you’re looking for!</p>
            <hr style={{ width: "60%" }} />
          </div>

          <div className={styles.serviceGrid}>
            {Object.values(services).map((item, index) => (
              <div key={index} className={styles.service}>
                <img width="90%" src={item.image} alt={item.shortTitle} />
                <div className={styles.serviceText}>
                  <h3>{item.shortTitle}</h3>
                  <p className={styles.serviceTag}>{item.tagline}</p>
                  <p>{item.blurb}</p>

                  <Link className={styles.cta} href="/contact ">
                    {item.ctaLabel || "Book Now"}
                  </Link>

                  <div style={{ padding: "3px" }}></div>
                  <Link href={`/cleaning-services/${item.slug}`}>
                    More {item.shortTitle} Info
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <br />
        <br />
        <div
          className={styles.aboutTwoGrid}
          style={{ margin: "auto", padding: "2%" }}
        >
          <div style={{ alignContent: "center" }}>
            <h2>Ready to Start A New Project?</h2>
            <a href="tel:+1-612-991-2832" target="_blank">
              <div className={styles.contactRow}>
                <PhoneIcon size={40} strokeWidth={1.5} />
                &nbsp;&nbsp; <p>(612) 991-2832</p>
              </div>
            </a>
            <a href="mailto:info@letuscleanmn.com" target="_blank">
              <div className={styles.contactRow}>
                <MailIcon size={40} strokeWidth={1.5} />
                &nbsp;&nbsp; <p>info@letuscleanmn.com</p>
              </div>
            </a>
            <a href="https://www.facebook.com/LetUsCleanMN" target="_blank">
              <div className={styles.contactRow}>
                <FacebookIcon size={50} strokeWidth={1.5} />
                &nbsp;&nbsp; <p>https://www.facebook.com/LetUsCleanMN</p>
              </div>
            </a>
          </div>
          <QuoteForm />
        </div>
        <br />
        <br />
        <section className={styles.downloadableCont}>
          <h2>Downloadable Materials</h2>
          <div className={styles.twoBtn}>
            <a
              href="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/Preparing.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.heroButton}>Preparing Checklist</div>
            </a>
            <a
              href="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/+Cleaning_Checklist.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.heroButton}>Cleaning Checklist</div>
            </a>
          </div>
        </section>

        {/* JSON-LD via next/script */}
        <Script
          id="home-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
