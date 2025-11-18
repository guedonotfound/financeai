import z from "zod";

export const updateOrderStatusSchema = z.object({
  id: z.string(),
  field: z.enum(["isPaid", "isBought"]),
  checked: z.boolean(),
});
