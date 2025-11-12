import z from "zod";

export const createOrderSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  products: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().positive().min(1),
      }),
    )
    .min(1, { message: "Selecione pelo menos um produto." }),
});
