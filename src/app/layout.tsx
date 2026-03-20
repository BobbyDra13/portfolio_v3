import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Cursor from "@/components/Cursor";

const siteUrl = "https://manaschandras.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Manas Chandra — Full-Stack Developer",
  description:
    "Full-stack developer specializing in MERN stack, 3D web experiences, and modern UI. Based in Mumbai.",
  keywords: [
    "Manas Chandra",
    "Full-Stack Developer",
    "MERN Stack",
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "TailwindCSS",
    "Portfolio",
    "Mumbai",
    "Web Developer India",
    "3D Web",
    "NIT Rourkela",
  ],
  authors: [{ name: "Manas Chandra", url: siteUrl }],
  creator: "Manas Chandra",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Manas Chandra — Full-Stack Developer",
    description:
      "Full-stack developer specializing in MERN stack, 3D web experiences, and modern UI. Based in Mumbai.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Manas Chandra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Chandra — Full-Stack Developer",
    description:
      "Full-stack developer specializing in MERN stack, 3D web experiences, and modern UI. Based in Mumbai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="noise">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
