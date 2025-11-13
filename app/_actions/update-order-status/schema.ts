import z from "zod";

export const updateOrderStatusSchema = z.object({
  id: z.string(),
  field: z.enum(["isPaid", "isDelivered"]),
  checked: z.boolean(),
});
