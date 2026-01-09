import services from "./data/services.json";
import postsData from "./data/posts.json";

const SITE_URL = "https://letuscleanmn.com";

export default async function sitemap() {
  // --- Static routes (add/remove as needed) ---
  const staticRoutes = [
    "",
    "/cleaning-services",
    "/blog",
    "/contact",
    "/about",
    // "/locations", etc...
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // --- Dynamic Service slugs ---
  const serviceRoutes = (services || [])
    .filter((s) => s?.slug)
    .map((s) => ({
      url: `${SITE_URL}/cleaning-services/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Dynamic blog pages from your posts.json structure
  // postsData = { posts: [ ... ] }
  const blogRoutes = (postsData?.posts || [])
    .filter((p) => p?.slug && !p?.draft)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.dateModified
        ? new Date(p.dateModified)
        : new Date(p.datePublished ?? now),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
