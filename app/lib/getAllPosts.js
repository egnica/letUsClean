import posts from "../data/posts.json";

export function getAllPosts() {
  return posts.posts.filter((post) => !post.draft);
}
