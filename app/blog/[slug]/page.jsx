import React from "react";
import styles from "../../page.module.css";
import { getSinglePost } from "../../lib/getSinglePost.js";
import Nav from "@/app/components/nav.jsx";
import PostBlock from "@/app/components/PostBlock";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (p) => <h2 className={styles.aboutMainH2} {...p} />,
  a: (p) => <a className={styles.aboutMainAnchor} {...p} />,
  p: (p) => <p className={styles.aboutMainParagraph} {...p} />,
};
export default async function Page({ params }) {
  const { slug } = await params; // if you see the same error, add await
  const post = getSinglePost(slug);
  if (!post) return <p>Post not found.</p>;

  return (
    <div className={styles.articleMain}>
      <Nav />

      <Link href="/blog">← All Posts</Link>
      <br />
      <h1>{post.title}</h1>
      <p>
        <em>
          {new Date(post.datePublished).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </em>
      </p>
      <br />
      <img width={"50%"} src={post.imageMainUrl} />
      <div>
        <MDXRemote source={post.introParagraph} components={components} />
      </div>

      <PostBlock block={post.contentBlocks} />
    </div>
  );
}
