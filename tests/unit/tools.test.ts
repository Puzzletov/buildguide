import { describe, expect, it } from "vitest";

import { PATH_TOOLS } from "@/lib/data/paths";
import { TOOL_LIBRARY } from "@/lib/data/tools";

describe("TOOL_LIBRARY", () => {
  it("every tool has required fields", () => {
    Object.values(TOOL_LIBRARY).forEach((tool) => {
      expect(tool.id).toBeTruthy();
      expect(tool.name).toBeTruthy();
      expect(tool.steps.length).toBeGreaterThan(0);
      expect(tool.badges.length).toBeGreaterThan(0);
    });
  });

  it("every tool has at least one step", () => {
    Object.values(TOOL_LIBRARY).forEach((tool) => {
      expect(tool.steps.length).toBeGreaterThan(0);
    });
  });

  it("meter values are between 0 and 100", () => {
    Object.values(TOOL_LIBRARY).forEach((tool) => {
      expect(tool.meters.cost).toBeGreaterThanOrEqual(0);
      expect(tool.meters.cost).toBeLessThanOrEqual(100);
      expect(tool.meters.speed).toBeGreaterThanOrEqual(0);
      expect(tool.meters.speed).toBeLessThanOrEqual(100);
      expect(tool.meters.quality).toBeGreaterThanOrEqual(0);
      expect(tool.meters.quality).toBeLessThanOrEqual(100);
    });
  });

  it("every tool referenced in PATH_TOOLS exists in TOOL_LIBRARY", () => {
    Object.values(PATH_TOOLS)
      .flat()
      .forEach((toolId) => {
        expect(TOOL_LIBRARY[toolId]).toBeDefined();
      });
  });
});

