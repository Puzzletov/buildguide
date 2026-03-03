import { describe, expect, it } from "vitest";

import { sortToolsByPriority } from "@/lib/utils/sort";

describe("sortToolsByPriority", () => {
  it("puts free tools first when cost=free", () => {
    const tools = ["cursor", "framer", "githubpages"];
    const priorities = { cost: "free", speed: "medium", quality: "medium" } as const;

    const sorted = sortToolsByPriority(tools, priorities);
    expect(sorted.indexOf("githubpages")).toBeLessThan(sorted.indexOf("cursor"));
  });

  it("puts high quality tools first when quality=high", () => {
    const tools = ["netlify", "webflow", "wordpress"];
    const priorities = { cost: "any", speed: "medium", quality: "high" } as const;

    const sorted = sortToolsByPriority(tools, priorities);
    expect(sorted[0]).toBe("webflow");
  });

  it("handles empty tool list", () => {
    const sorted = sortToolsByPriority([], { cost: null, speed: null, quality: null });
    expect(sorted).toEqual([]);
  });

  it("handles tools not in library gracefully", () => {
    const sorted = sortToolsByPriority(["unknown-tool"], { cost: "free", speed: "fast", quality: "high" });
    expect(sorted).toEqual(["unknown-tool"]);
  });
});

