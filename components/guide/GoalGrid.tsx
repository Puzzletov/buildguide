import type { GoalPath } from "@/lib/data/types";
import { getGoalGlyph } from "@/lib/design/glyphs";
import { GlyphChip } from "@/components/ui/GlyphChip";

interface GoalGridProps {
  goals: GoalPath[];
  onSelect: (path: GoalPath) => void;
}

export function GoalGrid({ goals, onSelect }: GoalGridProps) {
  return (
    <div className="goal-grid">
      {goals.map((goal) => {
        const glyph = getGoalGlyph(goal.path);
        return (
          <button
            className="goal-card"
            data-testid={`goal-card-${goal.path}`}
            key={goal.path}
            onClick={() => onSelect(goal)}
            type="button"
          >
            <div className="goal-icon">
              <GlyphChip label={glyph.label} size="lg" tone={glyph.tone} />
            </div>
            <div className="goal-title">{goal.title}</div>
            <div className="goal-desc">{goal.desc}</div>
          </button>
        );
      })}
    </div>
  );
}


