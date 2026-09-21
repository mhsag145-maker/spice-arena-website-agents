import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const lineSchema = z.object({
  no: z.number().int(),
  name: z.string(),
  price: z.number(),
  qty: z.number().int().min(1).max(50),
});

const orderSchema = z.object({
  tableNumber: z.string().max(20).nullable(),
  customerName: z.string().max(80).nullable(),
  phone: z.string().max(30).nullable(),
  orderType: z.enum(["dine-in", "takeaway"]),
  notes: z.string().max(500).nullable(),
  items: z.array(lineSchema).min(1).max(60),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const total = data.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .insert({
        table_number: data.tableNumber,
        customer_name: data.customerName,
        phone: data.phone,
        order_type: data.orderType,
        notes: data.notes,
        items: data.items as never,
        total,
      })
      .select("token_number, total, created_at")
      .single();

    if (error) {
      console.error("placeOrder failed", error.message);
      return { ok: false as const, error: "Could not save your order. Please try again." };
    }

    return { ok: true as const, token: row.token_number, total: Number(row.total) };
  });

export const listOrders = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ pin: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const pin = process.env["STAFF_PIN"];
    if (!pin || data.pin !== pin) {
      return { ok: false as const, error: "Wrong staff PIN." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("orders")
      .select("id, token_number, table_number, customer_name, phone, order_type, items, total, notes, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("listOrders failed", error.message);
      return { ok: false as const, error: "Could not load orders." };
    }

    return { ok: true as const, orders: rows ?? [] };
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({
      pin: z.string().min(1),
      id: z.string().uuid(),
      status: z.enum(["new", "preparing", "served"]),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const pin = process.env["STAFF_PIN"];
    if (!pin || data.pin !== pin) {
      return { ok: false as const, error: "Wrong staff PIN." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) {
      console.error("updateOrderStatus failed", error.message);
      return { ok: false as const, error: "Could not update the order." };
    }
    return { ok: true as const };
  });
