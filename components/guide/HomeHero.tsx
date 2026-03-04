import { Target, SlidersHorizontal, ListChecks } from "lucide-react";
import type { CSSProperties } from "react";

import { CyclingHero } from "@/components/hero/CyclingHero";
import { Icon } from "@/components/ui/Icon";

const FEATURE_PILLS = [
  { icon: "SplitSquareHorizontal", label: "Decision support" },
  { icon: "ListChecks", label: "Step-by-step setup" },
  { icon: "Rocket", label: "Launch ready" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Target,
    title: "Choose your outcome",
    body: "Start with what you need to build, not with tools. Tell BuildGuide your end goal first.",
    accent: "#2563eb",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Set your constraints",
    body: "Define budget, speed, and quality so recommendations match your context, not a generic list.",
    accent: "#7c3aed",
  },
  {
    step: "03",
    icon: ListChecks,
    title: "Execute one step at a time",
    body: "Follow setup, debugging, and launch flow without cognitive overload. One action, then the next.",
    accent: "#10b981",
  },
];

export function HomeHero() {
  return (
    <>
      <section className="hero-shell">
        <div aria-hidden className="hero-grid-bg" />
        <div aria-hidden className="hero-glow-orb" />

        <div className="hero-badge">
          <span aria-hidden className="hero-badge-ping" />
          <span aria-hidden className="hero-badge-dot" />
          <span>Build with clarity</span>
        </div>

        <CyclingHero />

        <p className="hero-sub">
          Choose what you want to build, set your constraints, and follow a step-by-step guide from first tool to
          production deployment.
        </p>

        <div className="hero-pill-row">
          {FEATURE_PILLS.map((pill) => (
            <div className="hero-pill" key={pill.label}>
              <Icon className="hero-pill-icon" name={pill.icon} size={16} />
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="process-shell" aria-label="How the guide works">
        {HOW_IT_WORKS.map((item) => {
          const ProcessIcon = item.icon;
          return (
            <article className="process-card" key={item.title}>
              <div aria-hidden className="process-num">
                {item.step}
              </div>

              <div className="process-icon-wrap" style={{ "--process-accent": item.accent } as CSSProperties}>
                <ProcessIcon size={18} />
              </div>

              <h2>{item.title}</h2>
              <p>{item.body}</p>

              <span aria-hidden className="process-accent-line" style={{ "--process-accent": item.accent } as CSSProperties} />
            </article>
          );
        })}
      </section>
    </>
  );
}
