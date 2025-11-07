"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";
import Services from "../data/services.json";
import { useState } from "react";
import { PhoneIcon } from "lucide-react";
import { motion, scale } from "framer-motion";
function nav() {
  const [isHovered, setIsHovered] = useState(false);

  const singleBoxVariant = {
    start: { opacity: 0, scale: 0 },
    hover: {
      opacity: 1,
      scale: "auto",
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  return (
    <nav className={styles.naBar}>
      <Link href={"/"}>
        <Image
          alt="let us clean logo"
          height={100}
          width={100}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp"
        />
      </Link>
      <h1 className={styles.titleHeader1}>Let Us Clean MN</h1>

      <div className={styles.mobileNav}>
        <Link className={styles.navItem} href="/">
          Home
        </Link>
        <Link className={styles.navItem} href={"../about"}>
          About
        </Link>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${styles.dropDownCont} `}
        >
          <Link href="/cleaning-services" className={styles.serviceNav}>
            Services
          </Link>
          {isHovered && (
            <div className={styles.dropItems}>
              {Object.values(Services).map((item) => (
                <Link
                  key={item.slug}
                  href={`/cleaning-services/${item.slug}`}
                  className={styles.dropLink}
                >
                  {item.shortTitle}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link className={styles.navItem} href={"../contact"}>
          Contact
        </Link>

        <Link className={styles.navItem} href={"../blog"}>
          Blog
        </Link>
      </div>
      <div className={styles.callToActionCont}>
        <a href="tel:+1-612-991-2832" className={styles.navButton}>
          <div className={styles.phoneNav}>
            <PhoneIcon size={30} strokeWidth={1.5} />
            Book A Cleaning
          </div>
        </a>
        <Link
          className={styles.navButton}
          href="/contact"
          style={{ display: "flex", alignItems: "center" }}
        >
          Free Quote
        </Link>
      </div>
    </nav>
  );
}

export default nav;
