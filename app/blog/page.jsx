import React from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { getAllPosts } from "../lib/getAllPosts";
import Nav from "../components/nav";

function blogList() {
  const posts = getAllPosts();
  return (
    <div className={styles.blogListContain}>
      <Nav />
      <h1>Let Us Clean Blog</h1>
      <div className={styles.rowContain}>
        {posts.map((item) => {
          return (
            <Link href={`blog/${item.slug}`} key={item._id}>
              <div className={styles.postContain}>
                <p>
                  <em>
                    {new Date(item.datePublished).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </em>
                </p>
                <img src={item.imageMainUrl} width={"30%"} />
                <h2>{item.title}</h2>

                <p>{item.description}</p>
                <br />
                <p>read time: {item.readingTime} mins</p>
                <br />
                <div className={styles.btnBlogCont}>
                  <button className={styles.button}>Read Now</button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default blogList;
