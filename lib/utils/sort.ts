import { TOOL_LIBRARY } from "@/lib/data/tools";
import type { Priorities } from "@/lib/data/types";

export function sortToolsByPriority(toolIds: string[], priorities: Priorities): string[] {
  const { cost, speed, quality } = priorities;

  const scoreFor = (id: string) => {
    const tool = TOOL_LIBRARY[id];
    if (!tool) {
      return -Infinity;
    }

    let score = 0;

    if (cost === "free") {
      score += tool.meters.cost * 2.6;
    } else if (cost === "low") {
      score += tool.meters.cost * 1.2;
      score += tool.meters.quality * 0.2;
    } else if (cost === "any") {
      score += tool.meters.quality * 0.7;
      score += tool.meters.speed * 0.2;
    }

    if (speed === "fast") {
      score += tool.meters.speed * 1.2;
    } else if (speed === "medium") {
      score += tool.meters.speed * 0.5;
    } else if (speed === "slow") {
      score += tool.meters.quality * 0.4;
      score += tool.meters.speed * 0.1;
    }

    if (quality === "high") {
      score += tool.meters.quality * 1.6;
    } else if (quality === "medium") {
      score += tool.meters.quality * 0.8;
    } else if (quality === "basic") {
      score += tool.meters.speed * 0.3;
      score += tool.meters.cost * 0.3;
    }

    return score;
  };

  return [...toolIds].sort((a, b) => {
    const ta = TOOL_LIBRARY[a];
    const tb = TOOL_LIBRARY[b];
    if (!ta || !tb) {
      return 0;
    }

    const scoreA = scoreFor(a);
    const scoreB = scoreFor(b);
    if (scoreA === scoreB) {
      return tb.meters.quality - ta.meters.quality;
    }
    return scoreB - scoreA;
  });
}

export function meterLabel(type: "cost" | "speed" | "quality", value: number): string {
  if (type === "cost") {
    if (value >= 85) return "Free / very cheap";
    if (value >= 55) return "Affordable";
    return "Paid / expensive";
  }

  if (type === "speed") {
    if (value >= 80) return "Same day";
    if (value >= 50) return "A few days";
    return "Takes time to learn";
  }

  if (value >= 88) return "Excellent";
  if (value >= 70) return "Very good";
  return "Good";
}

export function meterClass(value: number): "green" | "amber" | "red" {
  if (value >= 70) return "green";
  if (value >= 40) return "amber";
  return "red";
}


