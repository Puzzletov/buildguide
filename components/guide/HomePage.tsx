"use client";

import { useRouter } from "next/navigation";

import { BuildRoadmap } from "@/components/guide/BuildRoadmap";
import { GoalGrid } from "@/components/guide/GoalGrid";
import { HomeHero } from "@/components/guide/HomeHero";
import { GOAL_PATHS } from "@/lib/data/goals";

export function HomePage() {
  const router = useRouter();

  return (
    <>
      <header>
        <div className="logo">
          Build<span>Guide</span>
        </div>
      </header>
      <div className="stage">
        <div className="screen active home-screen" id="s0">
          <HomeHero />
          <BuildRoadmap />
          <div className="home-section-head">
            <div className="step-badge badge-amber">Select your path</div>
            <div className="screen-title">What do you want to build or set up?</div>
            <div className="screen-sub">
              Choose one path and we will guide your setup in the right order, from tools to deployment.
            </div>
          </div>
          <GoalGrid goals={GOAL_PATHS} onSelect={(goal) => router.push(`/guide/${goal.path}`)} />
        </div>
      </div>
    </>
  );
}
