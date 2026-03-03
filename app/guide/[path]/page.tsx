import { notFound } from "next/navigation";

import { GuideFlow } from "@/components/guide/GuideFlow";
import { GOAL_PATHS } from "@/lib/data/goals";

interface GuidePathPageProps {
  params: Promise<{ path: string }>;
}

export default async function GuidePathPage({ params }: GuidePathPageProps) {
  const { path } = await params;
  const exists = GOAL_PATHS.some((goal) => goal.path === path);
  if (!exists) {
    notFound();
  }

  return <GuideFlow path={path} />;
}


