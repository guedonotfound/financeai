import z from "zod";

export const upsertProductSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  amount: z.number().positive(),
  costPrice: z.number().positive(),
});
