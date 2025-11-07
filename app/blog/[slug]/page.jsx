import React from "react";
import { getAllPosts } from "../../lib/getAllPosts.js";
import { getSinglePost } from "../../lib/getSinglePost.js"

export default function Page({ params }) {
  const queryString = params.slug;
  return <div>slug: {queryString}</div>;
}
