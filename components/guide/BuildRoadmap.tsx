"use client";

import Link from "next/link";
import { DraftingCompass, Rocket, Workflow } from "lucide-react";

import { MASTER_ROADMAP, PATH_BLUEPRINTS } from "@/lib/data/roadmaps";

interface BuildRoadmapProps {
  path?: string;
  compact?: boolean;
}

const PHASE_ICONS = [DraftingCompass, Workflow, Rocket];

export function BuildRoadmap({ path, compact = false }: BuildRoadmapProps) {
  const blueprint = path ? PATH_BLUEPRINTS[path] : null;
  const phases = blueprint?.phases ?? MASTER_ROADMAP;

  return (
    <section
      className={`roadmap-shell ${compact ? "compact" : ""}`}
      data-testid={blueprint ? "path-roadmap" : "master-roadmap"}
    >
      <header className="roadmap-head">
        <div className="roadmap-kicker">{blueprint ? "Path blueprint" : "Build blueprint"}</div>
        <h3>{blueprint?.title ?? "Build architecture"}</h3>
        <p>
          {blueprint?.summary ??
            "Use this sequence to avoid rework: foundation first, then implementation, then release discipline."}
        </p>
      </header>

      <div className="roadmap-bento">
        {phases.slice(0, 3).map((phase, index) => {
          const PhaseIcon = PHASE_ICONS[index] ?? Workflow;

          return (
            <article className={`roadmap-phase roadmap-phase-${index + 1}`} key={phase.id}>
              <div className="roadmap-phase-bar" aria-hidden />
              <div className="roadmap-phase-content">
                <div className="roadmap-phase-tag">Phase {index + 1}</div>
                <div className="roadmap-phase-icon" aria-hidden>
                  <PhaseIcon size={22} />
                </div>
                <div className="roadmap-phase-title">{phase.title}</div>
                <p className="roadmap-phase-objective">{phase.objective}</p>
                <div className="roadmap-links">
                  {phase.links.map((link) => (
                    <Link className="roadmap-link-chip" href={`/guide/${link.path}`} key={`${phase.id}-${link.path}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
