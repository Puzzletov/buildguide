import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Priorities } from "@/lib/data/types";

interface PriorityKnobsProps {
  priorities: Priorities;
  onSetPriority: <K extends keyof Priorities>(key: K, value: NonNullable<Priorities[K]>) => void;
  onContinue: () => void;
}

interface SegmentOption {
  id: string;
  label: string;
  value: string;
  testId: string;
}

interface SegmentGroupProps {
  iconName: string;
  label: string;
  selected: string | null;
  options: SegmentOption[];
  onSelect: (value: string) => void;
}

function SegmentGroup({ iconName, label, selected, options, onSelect }: SegmentGroupProps) {
  return (
    <section className="priority-group" aria-label={label}>
      <div className="priority-group-head">
        <span aria-hidden className="priority-group-icon">
          <Icon name={iconName} size={14} />
        </span>
        <span>{label}</span>
      </div>
      <div className="segment-group" role="radiogroup">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              aria-checked={isSelected}
              className={`segment ${isSelected ? "selected" : ""}`}
              data-testid={option.testId}
              key={option.id}
              onClick={() => onSelect(option.value)}
              role="radio"
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function mapCost(value: Priorities["cost"]) {
  if (value === "free") return 1;
  if (value === "low") return 0.66;
  if (value === "any") return 0.32;
  return 0;
}

function mapSpeed(value: Priorities["speed"]) {
  if (value === "fast") return 1;
  if (value === "medium") return 0.66;
  if (value === "slow") return 0.32;
  return 0;
}

function mapQuality(value: Priorities["quality"]) {
  if (value === "high") return 1;
  if (value === "medium") return 0.66;
  if (value === "basic") return 0.32;
  return 0;
}

function lerpPoint(from: [number, number], to: [number, number], ratio: number): [number, number] {
  return [from[0] + (to[0] - from[0]) * ratio, from[1] + (to[1] - from[1]) * ratio];
}

export function PriorityKnobs({ priorities, onSetPriority, onContinue }: PriorityKnobsProps) {
  const done = Boolean(priorities.cost && priorities.speed && priorities.quality);

  const center: [number, number] = [50, 60];
  const freePoint = lerpPoint(center, [50, 10], mapCost(priorities.cost));
  const speedPoint = lerpPoint(center, [14, 88], mapSpeed(priorities.speed));
  const qualityPoint = lerpPoint(center, [86, 88], mapQuality(priorities.quality));
  const polygonPoints = `${freePoint[0]},${freePoint[1]} ${qualityPoint[0]},${qualityPoint[1]} ${speedPoint[0]},${speedPoint[1]}`;

  const allMaxed = priorities.cost === "free" && priorities.speed === "fast" && priorities.quality === "high";

  return (
    <div className="priority-screen">
      <div className="priority-panel">
        <SegmentGroup
          iconName="DollarSign"
          label="BUDGET"
          onSelect={(value) => onSetPriority("cost", value as NonNullable<Priorities["cost"]>)}
          options={[
            { id: "budget-free", label: "Free only", value: "free", testId: "knob-cost-free" },
            { id: "budget-low", label: "Under $15/mo", value: "low", testId: "knob-cost-low" },
            { id: "budget-any", label: "Happy to pay", value: "any", testId: "knob-cost-any" },
          ]}
          selected={priorities.cost}
        />

        <SegmentGroup
          iconName="Timer"
          label="SPEED"
          onSelect={(value) => onSetPriority("speed", value as NonNullable<Priorities["speed"]>)}
          options={[
            { id: "speed-fast", label: "Today", value: "fast", testId: "knob-speed-fast" },
            { id: "speed-medium", label: "Few days", value: "medium", testId: "knob-speed-medium" },
            { id: "speed-slow", label: "Take my time", value: "slow", testId: "knob-speed-slow" },
          ]}
          selected={priorities.speed}
        />

        <SegmentGroup
          iconName="Star"
          label="QUALITY"
          onSelect={(value) => onSetPriority("quality", value as NonNullable<Priorities["quality"]>)}
          options={[
            { id: "quality-high", label: "Top quality", value: "high", testId: "knob-quality-high" },
            { id: "quality-medium", label: "Good enough", value: "medium", testId: "knob-quality-medium" },
            { id: "quality-basic", label: "Just works", value: "basic", testId: "knob-quality-basic" },
          ]}
          selected={priorities.quality}
        />

        <section className="priority-triangle-card" data-testid="priority-visual" id="priority-visual">
          <svg aria-label="Priority trade-off triangle" className="priority-triangle" role="img" viewBox="0 0 100 100">
            <polygon className="triangle-base" points="50,10 86,88 14,88" />
            <polygon className="triangle-fill" points={polygonPoints} />
            <text className="triangle-label" x="50" y="6">
              Free
            </text>
            <text className="triangle-label" x="8" y="96">
              Fast
            </text>
            <text className="triangle-label" x="82" y="96">
              Quality
            </text>
          </svg>

          {allMaxed ? (
            <div className="priority-warning" id="pri-warning">
              <span className="priority-warning-dot" aria-hidden />
              <span>Heads up: the best tools rarely optimize all three equally.</span>
            </div>
          ) : null}
        </section>

        <div className="priority-action-row">
          <Button className="priority-submit-btn" data-testid="pri-continue" disabled={!done} onClick={onContinue} type="button">
            Show me my options →
          </Button>
        </div>
      </div>
    </div>
  );
}
