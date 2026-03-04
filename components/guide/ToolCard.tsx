"use client";

import type { CSSProperties } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, CircleCheck, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Tool } from "@/lib/data/types";
import { meterClass, meterLabel } from "@/lib/utils/sort";

interface ToolCardProps {
  tool: Tool;
  onChoose: () => void;
  onSkip: () => void;
  onPrev: () => void;
  canGoPrev: boolean;
  canSkipToAnother: boolean;
}

interface MeterRow {
  label: string;
  key: "cost" | "speed" | "quality";
  value: number;
}

export function ToolCard({ tool, onChoose, onSkip, onPrev, canGoPrev, canSkipToAnother }: ToolCardProps) {
  const meters: MeterRow[] = [
    { label: "Budget-friendly", key: "cost", value: tool.meters.cost },
    { label: "Speed to live", key: "speed", value: tool.meters.speed },
    { label: "Quality", key: "quality", value: tool.meters.quality },
  ];

  return (
    <article className="tool-card" data-testid="tool-card">
      <div className="tool-card-grid">
        <section className="tool-card-left-panel">
          <div aria-hidden className="tool-identity-icon">
            <Icon name={tool.icon} size={26} />
          </div>

          <h2 className="tool-card-name" data-testid="tool-name">
            {tool.name}
          </h2>
          <p className="tool-card-tagline">{tool.tagline}</p>

          <div className="tool-badges">
            {tool.badges.map((cls, i) => (
              <span className={`tbadge ${cls}`} key={`${tool.id}-${cls}-${i}`}>
                {tool.badgeLabels[i]}
              </span>
            ))}
          </div>

          <div className="tool-meter-stack">
            {meters.map((meter, meterIndex) => (
              <div className="meter-item" key={`${tool.id}-${meter.key}`}>
                <div className="meter-meta">
                  <span className="meter-label">{meter.label}</span>
                  <span className="meter-value">{meterLabel(meter.key, meter.value)}</span>
                </div>
                <div
                  className="meter-bar"
                  role="progressbar"
                  aria-label={meter.label}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={meter.value}
                >
                  <div
                    className={`meter-fill meter-fill-animate meter-delay-${meterIndex} ${meterClass(meter.value)}`}
                    style={{ "--meter-target": `${meter.value}%` } as CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`tool-verdict verdict-${tool.verdict.type}`}>
            <span className={`verdict-pill ${tool.verdict.type === "good" ? "verdict-pill-good" : "verdict-pill-warn"}`}>
              {tool.verdict.type === "good" ? (
                <>
                  <CircleCheck size={13} />
                  <span>Pass</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={13} />
                  <span>Warn</span>
                </>
              )}
            </span>
            <p>{tool.verdict.text}</p>
          </div>
        </section>

        <section className="tool-card-right-panel">
          <div className="tool-desc" dangerouslySetInnerHTML={{ __html: tool.desc }} />

          <div className="tool-detail-grid">
            {Object.entries(tool.details).map(([k, v]) => (
              <div className="detail-item" key={`${tool.id}-${k}`}>
                <div className="detail-label">{k}</div>
                <div className="detail-value">{v}</div>
              </div>
            ))}
          </div>

          <div className="tool-actions">
            <Button className="tool-action-primary" data-testid="car-choose" onClick={onChoose} type="button">
              <span>Choose this</span>
              <ArrowRight size={15} />
            </Button>
            <Button className="tool-action-secondary" data-testid="car-skip" onClick={onSkip} type="button" variant="secondary">
              <SkipForward size={15} />
              <span>{canSkipToAnother ? "Skip - next option" : "Skip - see all options"}</span>
            </Button>
            {canGoPrev ? (
              <Button className="tool-action-ghost" data-testid="car-prev" onClick={onPrev} type="button" variant="ghost">
                <ArrowLeft size={15} />
                <span>Prev</span>
              </Button>
            ) : null}
          </div>
        </section>
      </div>
    </article>
  );
}
