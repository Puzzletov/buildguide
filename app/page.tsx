import type { Metadata } from "next";

import { HomePage } from "@/components/guide/HomePage";
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BuildGuide",
  url: siteUrl,
  description:
    "BuildGuide helps users choose AI tools and follow practical setup flows for websites, apps, chatbots, and automation.",
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "BuildGuide",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BuildGuide",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "Interactive build guide for AI-powered software projects with step-by-step setup, debugging flow, and launch guidance.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const metadata: Metadata = {
  title: "BuildGuide - AI Tool Setup and Guided Build Flows",
  description:
    "Pick what to build, set priorities, compare options, and follow setup checklists to ship with AI tools faster and more reliably.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <HomePage />
    </>
  );
}


