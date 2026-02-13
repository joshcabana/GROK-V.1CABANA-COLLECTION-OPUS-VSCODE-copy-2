CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_checkout_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  currency TEXT NOT NULL,
  subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  shipping_cents INTEGER NOT NULL DEFAULT 0 CHECK (shipping_cents >= 0),
  tax_cents INTEGER NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  impact_cents INTEGER NOT NULL CHECK (impact_cents >= 0),
  status TEXT NOT NULL CHECK (status IN ('paid', 'refunded', 'failed')),
  shipping_address_json JSONB,
  confirmation_email_id TEXT,
  confirmation_email_status TEXT CHECK (
    confirmation_email_status IS NULL OR confirmation_email_status IN ('sent', 'failed')
  ),
  confirmation_email_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders (customer_email);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  unit_amount_cents INTEGER NOT NULL CHECK (unit_amount_cents >= 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  image_url TEXT,
  metadata_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

CREATE TABLE IF NOT EXISTS stripe_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  payload_json JSONB,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('processed', 'ignored', 'failed')),
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_stripe_events_received_at ON stripe_events (received_at DESC);
CREATE INDEX IF NOT EXISTS idx_stripe_events_type_status ON stripe_events (event_type, status);
