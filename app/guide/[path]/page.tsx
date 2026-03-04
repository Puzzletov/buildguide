import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideFlow } from "@/components/guide/GuideFlow";
import { GOAL_PATHS } from "@/lib/data/goals";
import { PATH_TOOLS } from "@/lib/data/paths";
import { TOOL_LIBRARY } from "@/lib/data/tools";
import { getSiteUrl } from "@/lib/seo/site";

interface GuidePathPageProps {
  params: Promise<{ path: string }>;
}

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return GOAL_PATHS.map((goal) => ({ path: goal.path }));
}

export async function generateMetadata({ params }: GuidePathPageProps): Promise<Metadata> {
  const { path } = await params;
  const goal = GOAL_PATHS.find((item) => item.path === path);

  if (!goal) {
    return {
      title: "Guide not found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/guide/${goal.path}`;
  const title = `${goal.title} - Setup Guide`;
  const description = `${goal.desc} Follow practical step-by-step guidance in BuildGuide.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteUrl}${canonicalPath}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function GuidePathPage({ params }: GuidePathPageProps) {
  const { path } = await params;
  const goal = GOAL_PATHS.find((item) => item.path === path);
  if (!goal) {
    notFound();
  }

  const toolIds = PATH_TOOLS[path] ?? [];
  const topTools = toolIds.filter((id) => Boolean(TOOL_LIBRARY[id])).slice(0, 10);

  const guideJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${goal.title} guide`,
    description: goal.desc,
    url: `${siteUrl}/guide/${goal.path}`,
    mainEntity: {
      "@type": "ItemList",
      name: `${goal.title} tool options`,
      itemListElement: topTools.map((id, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: TOOL_LIBRARY[id].name,
        url: `${siteUrl}/guide/${goal.path}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "BuildGuide",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: goal.title,
        item: `${siteUrl}/guide/${goal.path}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GuideFlow path={path} />
    </>
  );
}


