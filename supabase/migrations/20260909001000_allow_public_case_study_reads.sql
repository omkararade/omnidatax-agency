-- Case studies are public website content, so anonymous visitors must be able
-- to read them. Admin create/update/delete permissions remain unchanged.

ALTER TABLE public.case_studie ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read case studies" ON public.case_studie;

CREATE POLICY "Public can read case studies"
  ON public.case_studie
  FOR SELECT
  TO anon, authenticated
  USING (true);
