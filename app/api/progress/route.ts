import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getRateLimit } from "@/lib/utils/rateLimit";

const PathSchema = z.enum([
  "website",
  "aitools",
  "localai",
  "webapp",
  "chatbot",
  "automation",
  "mobileapp",
  "database",
  "deployment",
  "security",
  "testing",
  "bestpractices",
  "prompting",
  "notsure",
]);

const ProgressSchema = z.object({
  path: PathSchema,
  tool_id: z.string().max(50).optional(),
  step_index: z.number().int().min(0).max(200),
  priorities: z
    .object({
      cost: z.enum(["free", "low", "any"]),
      speed: z.enum(["fast", "medium", "slow"]),
      quality: z.enum(["high", "medium", "basic"]),
    })
    .optional(),
  completed: z.boolean().optional(),
  session_id: z.string().max(200).optional(),
});

const QuerySchema = z.object({
  path: PathSchema,
  session_id: z.string().max(200).optional(),
});

async function getUserId() {
  const cookieStore = await cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // not required for read-only auth lookup here
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

function getAdminClient() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceRole || !url) {
    throw new Error("Missing Supabase service role configuration");
  }

  return createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function checkRateLimit(routeLabel: string) {
  const limiter = getRateLimit();
  if (!limiter) {
    return null;
  }

  const hdrs = await headers();
  const key = hdrs.get("x-forwarded-for") ?? hdrs.get("x-real-ip") ?? "unknown";
  const result = await limiter.limit(`${routeLabel}:${key}`);

  if (!result.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return null;
}

export async function GET(req: Request) {
  const limited = await checkRateLimit("progress:read");
  if (limited) {
    return limited;
  }

  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    path: url.searchParams.get("path"),
    session_id: url.searchParams.get("session_id") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const userId = await getUserId();
  const { path, session_id } = parsed.data;

  if (!userId && !session_id) {
    return NextResponse.json({ error: "session_id or authenticated user required" }, { status: 401 });
  }

  const admin = getAdminClient();
  let query = admin
    .from("user_progress")
    .select("path, tool_id, step_index, priorities, completed, updated_at")
    .eq("path", path)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (userId) {
    query = query.eq("user_id", userId);
  } else {
    query = query.eq("session_id", session_id!);
  }

  const { data, error } = await query.maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? null);
}

export async function POST(req: Request) {
  const limited = await checkRateLimit("progress:write");
  if (limited) {
    return limited;
  }

  const body = await req.json();
  const parsed = ProgressSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const userId = await getUserId();
  const input = parsed.data;

  if (!userId && !input.session_id) {
    return NextResponse.json({ error: "session_id or authenticated user required" }, { status: 401 });
  }

  const admin = getAdminClient();

  const { data, error } = await admin
    .from("user_progress")
    .insert({
      user_id: userId,
      session_id: input.session_id ?? null,
      path: input.path,
      tool_id: input.tool_id ?? null,
      step_index: input.step_index,
      priorities: input.priorities ?? null,
      completed: input.completed ?? false,
    })
    .select("id, path, tool_id, step_index, priorities, completed, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (input.completed) {
    await admin.from("completions").insert({
      user_id: userId,
      session_id: input.session_id ?? null,
      tool_id: input.tool_id ?? "unknown",
      path: input.path,
    });
  }

  return NextResponse.json(data);
}


