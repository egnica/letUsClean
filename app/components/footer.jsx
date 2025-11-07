"use client";
import React from "react";
import styles from "../page.module.css";
import Link from "next/link";
import NEWordmark from "./NWLogo";
import Image from "next/image";
import { useEffect } from "react";

function footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footerContain}>
      <div className={styles.footLogoText}>
        <Image
          className={styles.footerLogo}
          alt="let us clean logo"
          height={100}
          width={100}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp"
        />

        <div>
          <h2 style={{ textAlign: "center" }}>
            Reach out to schedule our services.
          </h2>
          <p style={{ textAlign: "center" }}>
            Qualified professionals for each service you are looking for!
          </p>
          <p style={{ textAlign: "center" }}>612.991.2832 | info@letuscleanmn.com</p>
        </div>
      </div>
     
        
    
      <div className={styles.bottomFooter}>
        <p>© Let Us Clean LLC {currentYear} | powered by:&nbsp;&nbsp; </p>
        <a href="https:nicholasegner.com" target="_blank">
          <NEWordmark width={50} />
          <p> - Nicholas Egner - Web Development</p>
        </a>
      </div>
    </div>
  );
}

export default footer;
