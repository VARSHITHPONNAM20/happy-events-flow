
CREATE TABLE public.event_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_venue TEXT NOT NULL,
  event_location TEXT NOT NULL,
  ticket_tier_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own event bookings"
  ON public.event_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create event bookings"
  ON public.event_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
