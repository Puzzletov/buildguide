import type { Priorities } from "@/lib/data/types";

export interface ProgressPayload {
  path: string;
  tool_id?: string;
  step_index: number;
  priorities?: {
    cost: NonNullable<Priorities["cost"]>;
    speed: NonNullable<Priorities["speed"]>;
    quality: NonNullable<Priorities["quality"]>;
  };
  completed?: boolean;
  session_id?: string;
}

export async function saveProgress(payload: ProgressPayload): Promise<void> {
  await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function loadProgress(path: string, sessionId?: string): Promise<unknown> {
  const url = new URL("/api/progress", window.location.origin);
  url.searchParams.set("path", path);
  if (sessionId) {
    url.searchParams.set("session_id", sessionId);
  }

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export function getOrCreateSessionId(): string {
  const key = "buildguide_session_id";
  const existing = localStorage.getItem(key);
  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
}


