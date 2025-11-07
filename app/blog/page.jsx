import React from "react";
import Posts from "../data/posts.json";
import Link from "next/link";
import { getAllPosts } from "../lib/getAllPosts";

function blogList() {
  const posts = getAllPosts();
  return (
    <div>
      <h1>Let Us Clean Blog</h1>
      {posts.map((item) => {
        return (
          <Link href={`blog/${item.slug}`} key={item._id}>
            <div>
              <h2>{item.title}</h2>;
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default blogList;
