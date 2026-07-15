import { getAllBlogs } from "@/lib/blogs";
import type { MetadataRoute } from "next";

const SITE_URL = "https://my-brand-site-tau.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogs();

  const blogEntries: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogEntries,
  ];
}
