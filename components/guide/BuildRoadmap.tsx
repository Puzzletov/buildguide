"use client";

import Link from "next/link";

import { MASTER_ROADMAP, PATH_BLUEPRINTS } from "@/lib/data/roadmaps";

interface BuildRoadmapProps {
  path?: string;
  compact?: boolean;
}

export function BuildRoadmap({ path, compact = false }: BuildRoadmapProps) {
  const blueprint = path ? PATH_BLUEPRINTS[path] : null;
  const phases = blueprint?.phases ?? MASTER_ROADMAP;

  return (
    <section className={`roadmap-card ${compact ? "compact" : ""}`} data-testid={blueprint ? "path-roadmap" : "master-roadmap"}>
      <div className="roadmap-head">
        <div className="roadmap-kicker">{blueprint ? "Path blueprint" : "Build blueprint"}</div>
        <h3>{blueprint?.title ?? "Build Architecture"}</h3>
        <p>
          {blueprint?.summary ??
            "Use this sequence to avoid rework: foundation first, then implementation, then release discipline."}
        </p>
      </div>

      <div className="roadmap-grid">
        {phases.map((phase, index) => (
          <article className="roadmap-phase" key={phase.id}>
            <div className="roadmap-phase-index">{index + 1}</div>
            <div className="roadmap-phase-title">{phase.title}</div>
            <div className="roadmap-phase-objective">{phase.objective}</div>
            <div className="roadmap-links">
              {phase.links.map((link) => (
                <Link className="roadmap-link-chip" href={`/guide/${link.path}`} key={`${phase.id}-${link.path}`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
