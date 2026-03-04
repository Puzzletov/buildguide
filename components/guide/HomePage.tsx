"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BuildRoadmap } from "@/components/guide/BuildRoadmap";
import { GoalGrid } from "@/components/guide/GoalGrid";
import { HomeHero } from "@/components/guide/HomeHero";
import { GOAL_PATHS } from "@/lib/data/goals";

export function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`topbar topbar-home ${scrolled ? "topbar-scrolled" : ""}`}>
        <div className="brand-mark" aria-label="BuildGuide home">
          <span>Build</span>
          <span>Guide</span>
        </div>
        <div className="beta-pill">Beta</div>
      </header>

      <main className="stage">
        <section className="screen active home-screen" id="s0">
          <HomeHero />
          <BuildRoadmap />

          <section className="goal-section">
            <h2>What do you want to build?</h2>
            <p>
              Choose one path and follow the setup flow from foundations to deployment, with clear tool trade-offs and
              guided steps.
            </p>
            <GoalGrid goals={GOAL_PATHS} onSelect={(goal) => router.push(`/guide/${goal.path}`)} />
          </section>
        </section>
      </main>
    </>
  );
}
