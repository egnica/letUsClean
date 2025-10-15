"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function Home() {
  const sectionRef = useRef(null); // ✅ real ref object
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
            <h1>Professional Cleaning Services in Minneapolis, MN</h1>
            <h2>
              Reliable house cleaning and office cleaning for homes and
              businesses across Minneapolis and surrounding areas.
            </h2>

            <div>
              <div>Book A Cleaning</div>
              <div>Free Quote</div>
            </div>
          </div>
        </section>

        <div style={{ height: "800px" }}>
          <h2>Let Us Clean MN Cleaning Services</h2>
          <div className={styles.serviceGrid}></div>
        </div>
      </main>
    </div>
  );
}
