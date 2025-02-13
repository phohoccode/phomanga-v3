import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PHOMANGA-V3",
    short_name: "PHOMANGA-V3",
    description: "Website đọc truyện tranh online - Được xây dựng bởi phohococde",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/logo.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
