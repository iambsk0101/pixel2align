
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.file_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id text NOT NULL,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_created ON public.page_views(created_at DESC);
CREATE INDEX idx_file_views_created ON public.file_views(created_at DESC);
CREATE INDEX idx_file_views_fileid ON public.file_views(file_id);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page view"
  ON public.page_views FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can insert file view"
  ON public.file_views FOR INSERT TO public WITH CHECK (true);
