import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import type { GoalPath } from "@/lib/data/types";

interface GoalGridProps {
  goals: GoalPath[];
  onSelect: (goal: GoalPath) => void;
}

function styleForAccent(accent: string): CSSProperties {
  return {
    "--goal-accent": accent,
    "--goal-accent-soft": `${accent}16`,
    "--goal-accent-border": `${accent}35`,
    "--goal-accent-line": `${accent}66`,
  } as CSSProperties;
}

export function GoalGrid({ goals, onSelect }: GoalGridProps) {
  return (
    <div className="goal-grid">
      {goals.map((goal) => (
        <button
          aria-label={`Select ${goal.title}`}
          className="goal-card"
          data-testid={`goal-card-${goal.path}`}
          key={goal.path}
          onClick={() => onSelect(goal)}
          style={styleForAccent(goal.accent)}
          type="button"
        >
          <div className="goal-card-head">
            <div aria-hidden className="goal-icon-box">
              <Icon name={goal.icon} size={20} />
            </div>
            <div className="goal-tag-pill">{goal.tag}</div>
          </div>

          <div className="goal-title">{goal.title}</div>
          <div className="goal-desc">{goal.desc}</div>

          <div aria-hidden className="goal-arrow-line">
            <ChevronRight size={14} />
          </div>
        </button>
      ))}
    </div>
  );
}
