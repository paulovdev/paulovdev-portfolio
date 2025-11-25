import { Azeret_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const azeret = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://paulovdev.site"),

  title: "paulovdev — Front-end Developer & UX/UI Designer",
  description:
    "Front-end developer & UX/UI design, specializing in creating immersive and intuitive user experiences, consistently pushing the boundaries of design innovation.",

  keywords: [
    "front-end developer",
    "ui designer",
    "ux designer",
    "web developer",
    "react developer",
    "next.js",
    "design system",
    "user experience",
    "interface design",
    "web design",
    "creative developer",
  ],

  authors: [{ name: "Paulo Vitor" }],
  creator: "Paulo Vitor",
  publisher: "Paulo Vitor",

  openGraph: {
    type: "website",
    url: "https://paulovdev.site",
    title: "paulovdev — Front-end Developer & UX/UI Designer",
    description:
      "Front-end developer creating immersive digital experiences through clean code, smart interactions, and modern interface design.",
    siteName: "paulovdev",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@paulovdev",
    title: "paulovdev — portfolio 2026",
    description:
      "Crafting immersive interfaces and memorable digital experiences with design, motion, and modern front-end engineering.",
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://paulovdev.site",
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "paulovdev",
      alternateName: "Paulo Vitor",
      url: "https://paulovdev.site",
      description:
        "Front-end developer & UX/UI designer crafting immersive and intuitive user experiences.",
    }),

    "organization-logo": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Paulo Vitor",
      url: "https://paulovdev.site",
      logo: "https://paulovdev.site/logo.jpg",
    }),
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" className={azeret.variable}>
        <body className="antialiased">{children}</body>
      </html>
    </ViewTransitions>
  );
}
