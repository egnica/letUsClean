"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function Home() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

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
      </header>
      <main>
        <section ref={sectionRef} className={styles.mainSection}>
          <motion.img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean1.webp"
            alt="main"
            className={styles.mainImage}
            style={{ y, scale }}
            aria-hidden
          />
          <div className={styles.mainContent}>
            <div className={styles.heroText}>
              <h1>
                Let Us Clean MN – Trusted Minneapolis House Cleaning Services
              </h1>
              <h2>
                A locally owned cleaning company serving homes and small
                businesses across the Twin Cities. From one-time deep cleans to
                regular maintenance plans, our team makes your space shine — so
                you can spend time on what matters most.
              </h2>
            </div>
          </div>
          <div style={{ zIndex: 2 }}>
            <div>Book A Cleaning</div>
            <div>Free Quote</div>
          </div>
        </section>

        <div style={{ height: "800px" }}>
          <h1>Let Us Clean MN Cleaning Services</h1>
          <div className={styles.serviceGrid}>
            <div className={styles.service}>
              <Image></Image>
              <h2>Residential Cleaning Services in Minneapolis</h2>
              <p>
                Regular home cleaning, deep cleans, and custom schedules to fit
                your lifestyle.
              </p>
            </div>
            <div className={styles.service}>
              <Image></Image>
              <h2>Move-In & Move-Out Cleaning</h2>
              <p>Perfect for renters, landlords, and realtors.</p>
            </div>
            <div className={styles.service}>
              <h2>Office & Commercial Cleaning</h2>
              <p>
                Reliable cleaning for small offices, studios, and storefronts.
              </p>
            </div>
            <div className={styles.service}>
              <Image></Image>
              <h2>Post-Construction Cleaning</h2>
              <p>We’ll handle the dust so you can enjoy your new space.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
