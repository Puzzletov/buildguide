"use client";

import { useRouter } from "next/navigation";

import { GoalGrid } from "@/components/guide/GoalGrid";
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
        <div className="screen active" id="s0">
          <div className="step-badge badge-blue">Guide Start</div>
          <div className="screen-title">What do you want to build or set up?</div>
          <div className="screen-sub">
            Pick what&apos;s closest to your goal. We&apos;ll guide you through it, one small step at a time - no
            experience needed.
          </div>
          <GoalGrid goals={GOAL_PATHS} onSelect={(goal) => router.push(`/guide/${goal.path}`)} />
        </div>
      </div>
    </>
  );
}
