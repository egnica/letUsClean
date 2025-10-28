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
        <Image
          alt="let us clean logo"
          height={140}
          width={140}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp"
        />
        <h1>Let Us Clean MN</h1>
        <p>Home</p>
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
              <h2>
                A locally owned cleaning company serving homes and small
                businesses across the Twin Cities. From one-time deep cleans to
                regular maintenance plans, our team makes your space shine so
                you can spend time on what matters most.
              </h2>
            </div>
            <div>Book A Cleaning</div>
            <div>Free Quote</div>
          </div>
        </section>

        <div className={styles.servicesCont}>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
