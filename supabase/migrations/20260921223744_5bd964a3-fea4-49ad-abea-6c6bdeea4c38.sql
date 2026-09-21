CREATE SEQUENCE IF NOT EXISTS public.order_token_seq;

CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_number INTEGER NOT NULL DEFAULT nextval('public.order_token_seq'),
  table_number TEXT,
  customer_name TEXT,
  phone TEXT,
  order_type TEXT NOT NULL DEFAULT 'dine-in',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.order_token_seq TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);