import { MetadataRoute } from "next";

const siteUrl = "https://portfolio-v3-alpha-one.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
