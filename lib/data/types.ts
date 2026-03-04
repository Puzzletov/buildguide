export type Tier =
  | "tbadge-free"
  | "tbadge-paid"
  | "tbadge-fast"
  | "tbadge-quality"
  | "tbadge-best"
  | "tbadge-nocode";

export type MeterLevel = number;

export interface ToolMeters {
  cost: MeterLevel;
  speed: MeterLevel;
  quality: MeterLevel;
}

export interface ToolDetail {
  Cost: string;
  Speed: string;
  "Skill needed": string;
  "Best for": string;
}

export interface ToolVerdict {
  type: "good" | "warn";
  text: string;
}

export interface Step {
  title: string;
  body: string;
  sectionId?: string;
  sectionLabel?: string;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  badges: Tier[];
  badgeLabels: string[];
  meters: ToolMeters;
  desc: string;
  details: ToolDetail;
  verdict: ToolVerdict;
  steps: Step[];
  nextSteps: string[];
}

export type PriorityCost = "free" | "low" | "any";
export type PrioritySpeed = "fast" | "medium" | "slow";
export type PriorityQuality = "high" | "medium" | "basic";

export interface Priorities {
  cost: PriorityCost | null;
  speed: PrioritySpeed | null;
  quality: PriorityQuality | null;
}

export interface GoalPath {
  path: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  accent: string;
  needsPriorities: boolean;
  directToolId?: string;
}


