import { z } from 'zod'

export const productSchema = z.object({
  title: z.string({ required_error: 'El titulo del producto es requerido' }).nonempty(),
  code: z.string({ required_error: 'El codigo del producto es requerido' }).nonempty(),
  description: z.string({ required_error: 'La descripcion del producto es requerida' }).nonempty(),
  // thumbnail: z.array(z.string().url()).default([]),
  price: z.number(),
  stock: z.number().positive('El stock tiene que ser numerico'),
  category: z.string({ required_error: 'La categoria del producto es requerida' }).nonempty()
})
