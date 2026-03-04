import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrlObject } from "@/lib/seo/site";

const siteUrl = getSiteUrlObject();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "BuildGuide - Build with AI, ship with engineering discipline",
    template: "%s | BuildGuide",
  },
  description:
    "BuildGuide helps you choose AI tools, configure them correctly, and follow guided setup steps to launch websites, apps, chatbots, and automation projects.",
  keywords: [
    "AI build guide",
    "AI coding tools setup",
    "Claude Code setup",
    "Codex setup",
    "Cursor setup",
    "Windsurf setup",
    "build with AI",
    "developer onboarding",
    "prompt engineering",
    "deployment checklist",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "BuildGuide",
    title: "BuildGuide - Build with AI, ship with engineering discipline",
    description:
      "Choose the right AI toolchain, set priorities, and execute guided setup steps from project idea to production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildGuide",
    description:
      "A practical AI build guide for selecting tools, setting them up, and shipping with less trial and error.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}


