import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Manas Chandra — Portfolio",
    short_name: "MC.",
    description: "Full-stack developer specializing in MERN stack, 3D web experiences, and modern UI.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F0F",
    theme_color: "#FF6B00",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
