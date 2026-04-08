
CREATE TABLE public.movie_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  movie_id TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  show_time TEXT NOT NULL,
  show_format TEXT NOT NULL,
  seats TEXT[] NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.movie_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own movie bookings"
  ON public.movie_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create movie bookings"
  ON public.movie_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
