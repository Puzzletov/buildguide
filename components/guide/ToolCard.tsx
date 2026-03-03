import { GlyphChip } from "@/components/ui/GlyphChip";
import { getToolGlyph } from "@/lib/design/glyphs";
import type { Tool } from "@/lib/data/types";
import { meterClass, meterLabel } from "@/lib/utils/sort";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const glyph = getToolGlyph(tool.id, tool.name);

  return (
    <div className="tool-card" data-testid="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-left">
          <div className="tool-card-icon">
            <GlyphChip label={glyph.label} size="lg" tone={glyph.tone} />
          </div>
          <div>
            <div className="tool-card-name" data-testid="tool-name">
              {tool.name}
            </div>
            <div className="tool-card-tagline">{tool.tagline}</div>
          </div>
        </div>
        <div className="tool-badges">
          {tool.badges.map((cls, i) => (
            <span className={`tbadge ${cls}`} key={`${tool.id}-${cls}-${i}`}>
              {tool.badgeLabels[i]}
            </span>
          ))}
        </div>
      </div>

      <div className="tool-meters">
        <div className="meter-item">
          <div className="meter-label">Budget-friendly</div>
          <div className="meter-bar">
            <div className={`meter-fill ${meterClass(tool.meters.cost)}`} style={{ width: `${tool.meters.cost}%` }} />
          </div>
          <div className="meter-value">{meterLabel("cost", tool.meters.cost)}</div>
        </div>
        <div className="meter-item">
          <div className="meter-label">Speed to live</div>
          <div className="meter-bar">
            <div className={`meter-fill ${meterClass(tool.meters.speed)}`} style={{ width: `${tool.meters.speed}%` }} />
          </div>
          <div className="meter-value">{meterLabel("speed", tool.meters.speed)}</div>
        </div>
        <div className="meter-item">
          <div className="meter-label">Quality</div>
          <div className="meter-bar">
            <div className={`meter-fill ${meterClass(tool.meters.quality)}`} style={{ width: `${tool.meters.quality}%` }} />
          </div>
          <div className="meter-value">{meterLabel("quality", tool.meters.quality)}</div>
        </div>
      </div>

      <div className="tool-desc" dangerouslySetInnerHTML={{ __html: tool.desc }} />
      <div className="tool-detail-row">
        {Object.entries(tool.details).map(([k, v]) => (
          <div className="detail-item" key={`${tool.id}-${k}`}>
            <div className="detail-label">{k}</div>
            <div className="detail-value">{v}</div>
          </div>
        ))}
      </div>
      <div className={`tool-verdict verdict-${tool.verdict.type}`}>
        <span className={`verdict-pill ${tool.verdict.type === "good" ? "verdict-pill-good" : "verdict-pill-warn"}`}>
          {tool.verdict.type === "good" ? "PASS" : "WARN"}
        </span>{" "}
        {tool.verdict.text}
      </div>
    </div>
  );
}
