import { GlyphChip } from "@/components/ui/GlyphChip";
import { getToolGlyph } from "@/lib/design/glyphs";
import type { Priorities, Tool } from "@/lib/data/types";

interface SummaryGridProps {
  tools: Tool[];
  priorities: Priorities;
  onChoose: (id: string) => void;
}

export function SummaryGrid({ tools, priorities, onChoose }: SummaryGridProps) {
  const maxSpeed = Math.max(...tools.map((t) => t.meters.speed));
  const maxQuality = Math.max(...tools.map((t) => t.meters.quality));

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
        Ordered by what matters most to you: {descriptor || "default ranking"}. Click any option to start the setup
        guide.
      </div>
      <div className="summary-grid" id="summary-grid">
        {tools.map((tool, i) => {
          const glyph = getToolGlyph(tool.id, tool.name);
          const isTop = i === 0;
          const isFreeTop = tool.meters.cost >= 90;
          const isFastest = tool.meters.speed === maxSpeed;
          const isHighest = tool.meters.quality === maxQuality;

          const highlights: string[] = [];
          if (isTop) highlights.push("Best match for your priorities");
          if (isFreeTop && priorities.cost === "free") highlights.push("Free");
          if (isFastest && priorities.speed === "fast") highlights.push("Fastest");
          if (isHighest && priorities.quality === "high") highlights.push("Highest quality");

          return (
            <button
              className={`summary-card ${isTop ? "highlight-card" : ""}`}
              data-testid={`summary-card-${tool.id}`}
              key={tool.id}
              onClick={() => onChoose(tool.id)}
              type="button"
            >
              {isTop ? <div className="rec-ribbon">Best match</div> : null}
              <div className="sc-icon">
                <GlyphChip label={glyph.label} size="sm" tone={glyph.tone} />
              </div>
              <div className="sc-info">
                <div className="sc-name">{tool.name}</div>
                <div className="sc-desc">{tool.tagline}</div>
                <div className="sc-badges">
                  {tool.badges.map((badge, idx) => (
                    <span className={`tbadge ${badge}`} key={`${tool.id}-${badge}-${idx}`} style={{ fontSize: 10 }}>
                      {tool.badgeLabels[idx]}
                    </span>
                  ))}
                </div>
                {highlights.length > 0 ? (
                  <div style={{ marginTop: 6, fontSize: 12, color: "var(--accent)" }}>{highlights.join(" · ")}</div>
                ) : null}
              </div>
              <div className="sc-meters">
                {([
                  ["B", tool.meters.cost],
                  ["S", tool.meters.speed],
                  ["Q", tool.meters.quality],
                ] as [string, number][]).map(([label, value]) => (
                  <div className="sc-meter" key={`${tool.id}-${label}`}>
                    <div className="sc-meter-bar">
                      <div
                        className="sc-meter-fill"
                        style={{
                          height: `${value}%`,
                          background: value >= 70 ? "var(--green)" : value >= 40 ? "var(--amber)" : "#ef4444",
                        }}
                      />
                    </div>
                    <div className="sc-meter-label">{label}</div>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
