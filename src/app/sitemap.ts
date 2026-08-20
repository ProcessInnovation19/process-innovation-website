import type { MetadataRoute } from "next";

import { navigation, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
