-- Optional media preview and external destination fields for public case studies.
-- The public app reads these fields from `public.case_studie`.

ALTER TABLE IF EXISTS public.case_studie
  ADD COLUMN IF NOT EXISTS thumbnail_url text,
  ADD COLUMN IF NOT EXISTS thumbnail_type text,
  ADD COLUMN IF NOT EXISTS external_url text,
  ADD COLUMN IF NOT EXISTS external_link_label text;

DO $$
BEGIN
  IF to_regclass('public.case_studie') IS NOT NULL
    AND NOT EXISTS (
      SELECT 1
      FROM pg_constraint
      WHERE conname = 'case_studie_thumbnail_type_check'
        AND conrelid = 'public.case_studie'::regclass
    ) THEN
    ALTER TABLE public.case_studie
      ADD CONSTRAINT case_studie_thumbnail_type_check
      CHECK (
        thumbnail_type IS NULL
        OR thumbnail_type IN ('image', 'video', 'document')
      );
  END IF;
END $$;
