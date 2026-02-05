"use client";
import { useEffect } from "react";
import styles from "../page.module.css";
import Star from "./star";
export default function GoogleReviewsWidget() {
  const Reviews = [
    {
      image:
        "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/reviewPictures/review-1.png",
      name: "Brandon D",
      review:
        "Wonderful service! They clean my 78 year old father’s house and are very friendly,flexible, and professional. Highly recommend!",
      link: "https://maps.app.goo.gl/WQNiGAVqYQn9ZrP49",
    },
    {
      image:
        "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/reviewPictures/review-2.png",
      name: "Pamela",
      review:
        "They did a wonderful job cleaning my mom’s home. Very professional, so friendly and caring",
      link: "https://maps.app.goo.gl/npdsVy4E3gjrYkUM6",
    },
  ];

  return (
    <div className={styles.googleContainer}>
      <div className={styles.googleTitle}>
        <h2>Google Review</h2>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
        <div>
          <a
            href="https://g.page/r/CblAdYGgd-A4EAE/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.heroButton}>Leave a Review!</button>
          </a>
        </div>
        <br />
      </div>
      <div className={styles.reviewContain}>
        {Reviews.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.googlePostCont}>
              <div style={{ display: "grid" }}>
                <img src={item.image} alt={`Image of ${item.name}`} />
                <p style={{ textAlign: "center" }}>{item.name}</p>
              </div>
              <p style={{ margin: "auto" }}>{item.review}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
