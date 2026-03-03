import type { Priorities } from "@/lib/data/types";
import { Button } from "@/components/ui/Button";

interface PriorityKnobsProps {
  priorities: Priorities;
  onSetPriority: <K extends keyof Priorities>(key: K, value: NonNullable<Priorities[K]>) => void;
  onContinue: () => void;
}

function level(value: string | null, high: string): "high" | "medium" | "low" {
  if (!value) return "low";
  if (value === high) return "high";
  if (value === "medium" || value === "low") return "medium";
  return "low";
}

const labels = {
  high: "High priority",
  medium: "Medium",
  low: "Not a priority",
};

export function PriorityKnobs({ priorities, onSetPriority, onContinue }: PriorityKnobsProps) {
  const costLevel = level(priorities.cost, "free");
  const speedLevel = level(priorities.speed, "fast");
  const qualityLevel = level(priorities.quality, "high");

  const done = Boolean(priorities.cost && priorities.speed && priorities.quality);

  return (
    <>
      <div className="knob-group">
        <div className="knob-label">
          <span className="knob-icon">CST</span> Budget
        </div>
        <div className="knob-options">
          <button
            className={`knob-btn ${priorities.cost === "free" ? "selected" : ""}`}
            data-testid="knob-cost-free"
            onClick={() => onSetPriority("cost", "free")}
            type="button"
          >
            Free only - I won&apos;t pay anything
          </button>
          <button
            className={`knob-btn ${priorities.cost === "low" ? "selected" : ""}`}
            data-testid="knob-cost-low"
            onClick={() => onSetPriority("cost", "low")}
            type="button"
          >
            Cheap - under $15/month is fine
          </button>
          <button
            className={`knob-btn ${priorities.cost === "any" ? "selected" : ""}`}
            data-testid="knob-cost-any"
            onClick={() => onSetPriority("cost", "any")}
            type="button"
          >
            Happy to pay for quality
          </button>
        </div>
      </div>

      <div className="knob-group">
        <div className="knob-label">
          <span className="knob-icon">SPD</span> Speed
        </div>
        <div className="knob-options">
          <button
            className={`knob-btn ${priorities.speed === "fast" ? "selected" : ""}`}
            data-testid="knob-speed-fast"
            onClick={() => onSetPriority("speed", "fast")}
            type="button"
          >
            I want it done today
          </button>
          <button
            className={`knob-btn ${priorities.speed === "medium" ? "selected" : ""}`}
            data-testid="knob-speed-medium"
            onClick={() => onSetPriority("speed", "medium")}
            type="button"
          >
            A few days is fine
          </button>
          <button
            className={`knob-btn ${priorities.speed === "slow" ? "selected" : ""}`}
            data-testid="knob-speed-slow"
            onClick={() => onSetPriority("speed", "slow")}
            type="button"
          >
            I&apos;ll take my time to do it properly
          </button>
        </div>
      </div>

      <div className="knob-group">
        <div className="knob-label">
          <span className="knob-icon">QLT</span> Quality
        </div>
        <div className="knob-options">
          <button
            className={`knob-btn ${priorities.quality === "high" ? "selected" : ""}`}
            data-testid="knob-quality-high"
            onClick={() => onSetPriority("quality", "high")}
            type="button"
          >
            I want it to look and work great
          </button>
          <button
            className={`knob-btn ${priorities.quality === "medium" ? "selected" : ""}`}
            data-testid="knob-quality-medium"
            onClick={() => onSetPriority("quality", "medium")}
            type="button"
          >
            Good enough is fine
          </button>
          <button
            className={`knob-btn ${priorities.quality === "basic" ? "selected" : ""}`}
            data-testid="knob-quality-basic"
            onClick={() => onSetPriority("quality", "basic")}
            type="button"
          >
            I just need it to work
          </button>
        </div>
      </div>

      <div className="priority-visual" data-testid="priority-visual" style={{ display: done ? "grid" : "none" }}>
        <div className="pv-item">
          <div className="pv-name">Cost</div>
          <div className={`pv-bar ${costLevel}`} />
          <div className="pv-level">{labels[costLevel]}</div>
        </div>
        <div className="pv-item">
          <div className="pv-name">Speed</div>
          <div className={`pv-bar ${speedLevel}`} />
          <div className="pv-level">{labels[speedLevel]}</div>
        </div>
        <div className="pv-item">
          <div className="pv-name">Quality</div>
          <div className={`pv-bar ${qualityLevel}`} />
          <div className="pv-level">{labels[qualityLevel]}</div>
        </div>
      </div>

      {priorities.cost === "free" && priorities.speed === "fast" && priorities.quality === "high" ? (
        <div className="tip-box" id="pri-warning">
          <span>WARN</span>
          <span>
            Heads up: free, fast, and high-quality is very hard to achieve all at once - something usually gives.
            We&apos;ll show you the best compromises.
          </span>
        </div>
      ) : null}

      <div className="btn-row" style={{ marginTop: 28 }}>
        <Button data-testid="pri-continue" disabled={!done} onClick={onContinue} type="button">
          {"Show me my options \u2192"}
        </Button>
      </div>
    </>
  );
}
