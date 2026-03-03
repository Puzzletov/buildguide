import { BuildRoadmap } from "@/components/guide/BuildRoadmap";
import type { Priorities } from "@/lib/data/types";

interface FlowSidebarProps {
  path: string;
  pathTitle: string;
  activeScreenLabel: string;
  priorities: Priorities;
  optionsCount: number;
  chosenToolName: string | null;
}

function priorityLabel(value: string | null): string {
  if (!value) return "Not set";
  if (value === "free") return "Free only";
  if (value === "low") return "Low budget";
  if (value === "any") return "Any budget";
  if (value === "fast") return "Fast";
  if (value === "medium") return "Medium";
  if (value === "slow") return "Slow";
  if (value === "high") return "High";
  if (value === "basic") return "Basic";
  return value;
}

export function FlowSidebar({
  path,
  pathTitle,
  activeScreenLabel,
  priorities,
  optionsCount,
  chosenToolName,
}: FlowSidebarProps) {
  return (
    <aside className="flow-sidebar">
      <section className="flow-status-card">
        <div className="flow-status-title">Flow status</div>
        <div className="flow-status-row">
          <span className="flow-status-key">Path</span>
          <span className="flow-status-value">{pathTitle}</span>
        </div>
        <div className="flow-status-row">
          <span className="flow-status-key">Screen</span>
          <span className="flow-status-value">{activeScreenLabel}</span>
        </div>
        <div className="flow-status-row">
          <span className="flow-status-key">Options</span>
          <span className="flow-status-value">{optionsCount}</span>
        </div>
        <div className="flow-status-row">
          <span className="flow-status-key">Selected tool</span>
          <span className="flow-status-value">{chosenToolName ?? "Not selected"}</span>
        </div>
      </section>

      <section className="flow-status-card">
        <div className="flow-status-title">Current priorities</div>
        <div className="flow-status-row">
          <span className="flow-status-key">Budget</span>
          <span className="flow-status-value">{priorityLabel(priorities.cost)}</span>
        </div>
        <div className="flow-status-row">
          <span className="flow-status-key">Speed</span>
          <span className="flow-status-value">{priorityLabel(priorities.speed)}</span>
        </div>
        <div className="flow-status-row">
          <span className="flow-status-key">Quality</span>
          <span className="flow-status-value">{priorityLabel(priorities.quality)}</span>
        </div>
      </section>

      <BuildRoadmap compact path={path} />
    </aside>
  );
}
