import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ getAll: () => [] })),
  headers: vi.fn(async () => new Headers()),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(async () => ({ data: { user: null } })),
    },
  })),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn(() => ({ maybeSingle: vi.fn(async () => ({ data: null, error: null })) })),
          })),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({ single: vi.fn(async () => ({ data: { id: "1" }, error: null })) })),
      })),
    })),
  })),
}));

vi.mock("@/lib/utils/rateLimit", () => ({
  getRateLimit: () => null,
}));

import { GET, POST } from "@/app/api/progress/route";

describe("/api/progress", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service_role";
  });

  it("returns 400 for invalid POST payload", async () => {
    const req = new Request("http://localhost/api/progress", {
      method: "POST",
      body: JSON.stringify({ path: "invalid", step_index: 0 }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("requires session_id or auth token for POST", async () => {
    const req = new Request("http://localhost/api/progress", {
      method: "POST",
      body: JSON.stringify({ path: "website", step_index: 0 }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid GET query", async () => {
    const req = new Request("http://localhost/api/progress?path=bad-path", { method: "GET" });
    const res = await GET(req);
    expect(res.status).toBe(400);
  });
});

