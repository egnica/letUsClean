import posts from "../data/posts.json";

export function getSinglePost(slug) {
  return posts.posts.find((post) => post.slug === slug);
}
