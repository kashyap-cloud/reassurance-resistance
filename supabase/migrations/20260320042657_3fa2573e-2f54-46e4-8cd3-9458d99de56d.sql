
-- Create table for reassurance resistance exercise sessions
CREATE TABLE public.exercise_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  worry_text TEXT,
  reassurance_urge_type TEXT,
  body_areas TEXT[],
  timer_duration INTEGER,
  mood_emoji TEXT,
  reflection_note TEXT,
  next_time_goal TEXT,
  naming_response TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.exercise_sessions ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (no auth required for this activity app)
-- In production you'd tie this to auth.uid()
CREATE POLICY "Allow all reads" ON public.exercise_sessions FOR SELECT USING (true);
CREATE POLICY "Allow all inserts" ON public.exercise_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates" ON public.exercise_sessions FOR UPDATE USING (true);
