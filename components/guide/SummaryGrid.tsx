"use client";

import { useMemo, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import type { Priorities, Tool } from "@/lib/data/types";

interface SummaryGridProps {
  tools: Tool[];
  priorities: Priorities;
  onChoose: (id: string) => void;
}

interface MetricConfig {
  label: string;
  key: "cost" | "speed" | "quality";
  className: string;
}

const METRICS: MetricConfig[] = [
  { label: "Budget", key: "cost", className: "metric-budget" },
  { label: "Speed", key: "speed", className: "metric-speed" },
  { label: "Quality", key: "quality", className: "metric-quality" },
];

function renderMetrics(tool: Tool) {
  return (
    <div className="summary-metric-grid">
      {METRICS.map((metric) => (
        <div className="summary-metric" key={`${tool.id}-${metric.key}`}>
          <span>{metric.label}</span>
          <div className="summary-meter-bar">
            <div className={`summary-meter-fill ${metric.className}`} style={{ width: `${tool.meters[metric.key]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function priorityLabel(value: string | null): string {
  if (!value) return "Balanced";
  if (value === "free") return "Free budget";
  if (value === "low") return "Low budget";
  if (value === "any") return "Flexible budget";
  if (value === "fast") return "Speed";
  if (value === "medium") return "Moderate pace";
  if (value === "slow") return "Deliberate pace";
  if (value === "high") return "High quality";
  if (value === "basic") return "Basic quality";
  return value;
}

export function SummaryGrid({ tools, priorities, onChoose }: SummaryGridProps) {
  const [showUnmatched, setShowUnmatched] = useState(false);

  const descriptor = useMemo(
    () => [priorityLabel(priorities.cost), priorityLabel(priorities.speed), priorityLabel(priorities.quality)].join(" · "),
    [priorities.cost, priorities.quality, priorities.speed],
  );

  if (tools.length === 0) {
    return <div className="screen-sub">No tools available for this path yet.</div>;
  }

  const featured = tools[0];
  const coreOptions = tools.slice(1, 5);
  const extraOptions = tools.slice(5);

  return (
    <section className="summary-shell">
      <div className="summary-callout">You prioritised: {descriptor}</div>

      <button
        className="summary-featured"
        data-testid={`summary-card-${featured.id}`}
        onClick={() => onChoose(featured.id)}
        type="button"
      >
        <div className="summary-featured-badge">Best match</div>
        <div className="summary-featured-head">
          <div aria-hidden className="summary-tool-icon">
            <Icon name={featured.icon} size={20} />
          </div>
          <div>
            <h3>{featured.name}</h3>
            <p>{featured.tagline}</p>
          </div>
        </div>
        {renderMetrics(featured)}
        <div className="summary-featured-verdict">{featured.verdict.text}</div>
      </button>

      <div className="summary-grid" id="summary-grid">
        {coreOptions.map((tool) => (
          <button className="summary-card" data-testid={`summary-card-${tool.id}`} key={tool.id} onClick={() => onChoose(tool.id)} type="button">
            <div className="summary-card-head">
              <div aria-hidden className="summary-tool-icon small">
                <Icon name={tool.icon} size={16} />
              </div>
              <div>
                <h4>{tool.name}</h4>
                <p>{tool.tagline}</p>
              </div>
            </div>
            {renderMetrics(tool)}
          </button>
        ))}
      </div>

      {extraOptions.length > 0 ? (
        <div className="summary-extra-wrap">
          <button className="summary-extra-toggle" onClick={() => setShowUnmatched((prev) => !prev)} type="button">
            {showUnmatched ? "Hide" : "Show"} tools not matched to your top priorities
          </button>

          {showUnmatched ? (
            <div className="summary-extra-grid">
              {extraOptions.map((tool) => (
                <button
                  className="summary-card summary-card-dim"
                  data-testid={`summary-card-${tool.id}`}
                  key={tool.id}
                  onClick={() => onChoose(tool.id)}
                  type="button"
                >
                  <div className="summary-card-head">
                    <div aria-hidden className="summary-tool-icon small">
                      <Icon name={tool.icon} size={16} />
                    </div>
                    <div>
                      <h4>{tool.name}</h4>
                      <p>{tool.tagline}</p>
                    </div>
                  </div>
                  {renderMetrics(tool)}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
