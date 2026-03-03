import { TOOL_LIBRARY } from "@/lib/data/tools";
import type { Priorities } from "@/lib/data/types";

export function sortToolsByPriority(toolIds: string[], priorities: Priorities): string[] {
  const { cost, speed, quality } = priorities;

  return [...toolIds].sort((a, b) => {
    const ta = TOOL_LIBRARY[a];
    const tb = TOOL_LIBRARY[b];
    if (!ta || !tb) {
      return 0;
    }

    let scoreA = 0;
    let scoreB = 0;

    if (cost === "free") {
      scoreA += ta.meters.cost;
      scoreB += tb.meters.cost;
    } else if (cost === "any") {
      scoreA += ta.meters.quality;
      scoreB += tb.meters.quality;
    }

    if (speed === "fast") {
      scoreA += ta.meters.speed;
      scoreB += tb.meters.speed;
    }

    if (quality === "high") {
      scoreA += ta.meters.quality;
      scoreB += tb.meters.quality;
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


