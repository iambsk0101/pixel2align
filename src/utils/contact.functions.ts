import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  brief: z.string().trim().min(5).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => Schema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await sb.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      brief: data.brief,
    });
    if (error) return { ok: false, error: "Failed to save. Try again." };
    return { ok: true };
  });
