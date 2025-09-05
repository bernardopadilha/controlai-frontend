import z from 'zod'

export const CreateExpenseSchema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z.number().positive().multipleOf(0.01),
  ),
  description: z.string(),
  date: z.preprocess(
    (val) =>
      typeof val === 'string' || typeof val === 'number' ? new Date(val) : val,
    z.date(),
  ),
  categoryId: z.string(),
})
export type CreateExpenseSchemaType = z.infer<typeof CreateExpenseSchema>
