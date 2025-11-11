import { getSinglePost } from "../../lib/getSinglePost";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getSinglePost(slug);
  if (!post) return { title: "Post not found | Let Us Clean MN" };

  const url = `https://letuscleanmn.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Let Us Clean MN`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      images: post.imageMain
        ? [{ url: post.imageMain, alt: post.imageMainAlt || post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.imageMain ? [post.imageMain] : [],
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostLayout({ children, params }) {
  const { slug } = await params;
  const post = getSinglePost(slug);

  if (!post) return <>{children}</>;

  const url = `https://letuscleanmn.com/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.imageMain ? [post.imageMain] : undefined,
    datePublished: post.datePublished || undefined,
    dateModified: post.dateModified || post.datePublished || undefined,
    author: {
      "@type": "Organization",
      name: "Let Us Clean MN",
    },
    publisher: {
      "@type": "Organization",
      name: "Let Us Clean MN",
      logo: {
        "@type": "ImageObject",
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url: url,
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : undefined,
    articleSection: post.category || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // stringify with no indentation to keep it small
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
