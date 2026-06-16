DROP POLICY IF EXISTS "Anyone can read own session" ON public.copilot_messages;
REVOKE SELECT ON public.copilot_messages FROM anon;
REVOKE SELECT ON public.contact_submissions FROM anon;
REVOKE SELECT ON public.contact_submissions FROM authenticated;