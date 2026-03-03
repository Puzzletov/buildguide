import { beforeEach, describe, expect, it } from "vitest";

import { getOrCreateSessionId } from "@/lib/utils/progress";

describe("progress helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates and reuses session id", () => {
    const first = getOrCreateSessionId();
    const second = getOrCreateSessionId();

    expect(first).toBeTruthy();
    expect(first).toBe(second);
  });
});

