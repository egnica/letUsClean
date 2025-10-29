"use client";
//Home Page
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import services from "./data/services.json";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function Home() {
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
    prefersReduced ? ["0%", "0%"] : ["-35%", "35%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [1, 1] : [1.15, 1.05] // starts zoomed-in a bit
  );

  const imageArray = [
    "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean1.webp",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean2.webp",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean3.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeIndex((prevIndex) =>
        prevIndex + 1 >= imageArray.length ? 0 : prevIndex + 1
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <header>
        <Link href={"/"}>
          <Image
            alt="let us clean logo"
            height={100}
            width={100}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp"
          />
        </Link>
        <h1 className={styles.titleHeader1} style={{ paddingRight: "50px" }}>
          Let Us Clean MN
        </h1>
        <Link href="/">Home</Link>
        <p>About</p>
        <Link href="/cleaning-services">Services</Link>
        <p>Contact</p>
        <p>FAQ</p>
        <p>Blog</p>
      </header>

      <main>
        <section ref={sectionRef} className={styles.mainSection}>
          <div className={styles.overlay}></div>
          <motion.img
            initial={{ opacity: 0.4, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            className={styles.imgOverlay}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/shape-cover.png"
          />
          <AnimatePresence mode="wait">
            <motion.img
              src={imageArray[changeIndex]}
              alt="main"
              className={styles.mainImage}
              style={{ y, scale }}
              aria-hidden
              key={changeIndex}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
            />
          </AnimatePresence>
          <div className={styles.mainContent}>
            <div className={styles.heroText}>
              <h1 className={styles.mainh1}>Let Us Clean MN</h1>
              <h1 className={styles.secondh1}>
                Trusted Minneapolis House Cleaning Services
              </h1>
              <br />
              <br />
            </div>
            <div className={styles.twoBtn}>
              <div className={styles.heroButton}>Book A Cleaning</div>
              <div className={styles.heroButton}>Free Quote</div>
            </div>
          </div>
        </section>
        <section className={styles.belowMain}>
          <img src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/4PannelClean.webp" />
          <div className={styles.belowMainText}>
            <div style={{ margin: "auto" }}>
              <h1>
                <strong style={{ color: "#7b5c8d" }}>Experience</strong> a
                cleaner, healthier{" "}
                <strong style={{ color: "#deb344" }}>environment.</strong>
              </h1>
              <h2>
                A locally owned cleaning company serving homes and small
                businesses across the Twin Cities. From one-time deep cleans to
                regular maintenance plans, our team makes your space shine so
                you can spend time on what matters most.
              </h2>
            </div>
          </div>
        </section>
        <section className={styles.servicesCont}>
          <div className={styles.servicesTitle}>
            <h1>Let Us Clean MN Cleaning Services</h1>
            <p>
              Qualified professionals for each service you are looking for!!
            </p>
            <hr style={{ width: "60%" }} />
          </div>

          <div className={styles.serviceGrid}>
            {Object.values(services).map((item, index) => (
              <div key={index} className={styles.service}>
                <img width="90%" src={item.image} />
                <div className={styles.serviceText}>
                  <h2>{item.shortTitle}</h2>
                  <h3>{item.tagline}</h3>
                  <p>{item.blurb}</p>

                  <div>{item.ctaLabel}</div>
                  <Link href={`/cleaning-services/${item.slug}`}>
                    More Info
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
