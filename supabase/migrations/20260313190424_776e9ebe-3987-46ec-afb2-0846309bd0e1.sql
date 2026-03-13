
CREATE TABLE public.library_books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_mr TEXT,
  author TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  description_en TEXT,
  description_mr TEXT,
  cover_url TEXT,
  external_link TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Library books viewable by everyone" ON public.library_books
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admins can manage library books" ON public.library_books
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_library_books_updated_at
  BEFORE UPDATE ON public.library_books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
