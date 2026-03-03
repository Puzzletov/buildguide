import { GlyphChip } from "@/components/ui/GlyphChip";
import { getToolGlyph } from "@/lib/design/glyphs";
import type { Priorities, Tool } from "@/lib/data/types";
import { meterClass } from "@/lib/utils/sort";

interface SummaryGridProps {
  tools: Tool[];
  priorities: Priorities;
  onChoose: (id: string) => void;
}

export function SummaryGrid({ tools, priorities, onChoose }: SummaryGridProps) {
  if (tools.length === 0) {
    return <div className="screen-sub">No tools available for this path yet.</div>;
  }

  const maxSpeed = Math.max(...tools.map((t) => t.meters.speed));
  const maxQuality = Math.max(...tools.map((t) => t.meters.quality));
  const maxCost = Math.max(...tools.map((t) => t.meters.cost));

  const descriptor = [
    priorities.cost ? "budget" : null,
    priorities.speed ? "speed" : null,
    priorities.quality ? "quality" : null,
  ]
    .filter(Boolean)
    .join(" + ");

  return (
    <>
      <div className="screen-sub" id="sum-sub">
        Ranked for your priorities: <strong>{descriptor || "balanced defaults"}</strong>. Pick one option to open the
        full setup guide.
      </div>
      <div className="summary-grid" id="summary-grid">
        {tools.map((tool, i) => {
          const glyph = getToolGlyph(tool.id, tool.name);
          const isTop = i === 0;
          const highlights: string[] = [];

          if (isTop) highlights.push("Top match");
          if (priorities.cost === "free" && tool.meters.cost === maxCost) highlights.push("Lowest cost");
          if (priorities.speed === "fast" && tool.meters.speed === maxSpeed) highlights.push("Fastest");
          if (priorities.quality === "high" && tool.meters.quality === maxQuality) highlights.push("Highest quality");

          return (
            <button
              className={`summary-card ${isTop ? "highlight-card" : ""}`}
              data-testid={`summary-card-${tool.id}`}
              key={tool.id}
              onClick={() => onChoose(tool.id)}
              type="button"
            >
              {isTop ? <div className="rec-ribbon">Best match</div> : null}

              <div className="summary-head">
                <GlyphChip label={glyph.label} size="sm" tone={glyph.tone} />
                <div>
                  <div className="sc-name">{tool.name}</div>
                  <div className="sc-desc">{tool.tagline}</div>
                </div>
              </div>

              <div className="summary-meter-list">
                {([
                  ["Budget", tool.meters.cost],
                  ["Speed", tool.meters.speed],
                  ["Quality", tool.meters.quality],
                ] as [string, number][]).map(([label, value]) => (
                  <div className="summary-meter-row" key={`${tool.id}-${label}`}>
                    <span>{label}</span>
                    <div className="summary-meter-bar">
                      <div className={`summary-meter-fill ${meterClass(value)}`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="sc-badges">
                {highlights.length > 0
                  ? highlights.map((item) => (
                      <span className="summary-pill" key={`${tool.id}-${item}`}>
                        {item}
                      </span>
                    ))
                  : null}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
