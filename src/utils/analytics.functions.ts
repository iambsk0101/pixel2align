import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const sb = () =>
  createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

export const trackPageView = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        path: z.string().min(1).max(500),
        referrer: z.string().max(500).optional(),
        sessionId: z.string().min(1).max(100),
        userAgent: z.string().max(500).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await sb().from("page_views").insert({
      path: data.path,
      referrer: data.referrer || null,
      session_id: data.sessionId,
      user_agent: data.userAgent || null,
    });
    return { ok: true };
  });

export const trackFileView = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        fileId: z.string().min(1).max(50),
        sessionId: z.string().min(1).max(100),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await sb().from("file_views").insert({
      file_id: data.fileId,
      session_id: data.sessionId,
    });
    return { ok: true };
  });

export const getAnalytics = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || data.password !== expected) {
      return { ok: false as const, error: "Invalid password" };
    }
    const client = sb();
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [pv, fv] = await Promise.all([
      client.from("page_views").select("id, path, referrer, session_id, created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(1000),
      client.from("file_views").select("id, file_id, session_id, created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(2000),
    ]);

    const pageViews = pv.data || [];
    const fileViews = fv.data || [];

    const sessions = new Set(pageViews.map((r) => r.session_id).filter(Boolean));

    const fileCounts: Record<string, number> = {};
    for (const r of fileViews) fileCounts[r.file_id] = (fileCounts[r.file_id] || 0) + 1;
    const topFiles = Object.entries(fileCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const refCounts: Record<string, number> = {};
    for (const r of pageViews) {
      const k = r.referrer || "direct";
      refCounts[k] = (refCounts[k] || 0) + 1;
    }
    const topRefs = Object.entries(refCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Daily series (last 14 days)
    const days: { day: string; views: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().slice(0, 10);
      days.push({ day: key, views: 0 });
    }
    for (const r of pageViews) {
      const k = r.created_at.slice(0, 10);
      const found = days.find((x) => x.day === k);
      if (found) found.views++;
    }

    return {
      ok: true as const,
      totalViews: pageViews.length,
      uniqueSessions: sessions.size,
      topFiles,
      topRefs,
      daily: days,
      recent: pageViews.slice(0, 20),
    };
  });
