import { object, string } from 'zod'

export const loginSchema = object({
  email: string({ required_error: 'El email es requerido' }).email('Ingrese un correo electrónico válido'),
  password: string({ required_error: 'La contraseña es requerida' })
})

export const restorePasswordSchema = object({
  email: string({ required_error: 'El email es requerido' }).email('Ingrese un correo electrónico válido')
})

export const updatePasswordSchema = object({
  password: string({ required_error: 'El campo es requerido' }),
  confirmPassword: string({ required_error: 'El campo es requerido' })
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: 'La contraseña no coincide',
  path: ['confirmPassword']
})

export const registerSchema = object({
  firstname: string({ required_error: 'El nombre es requerido' }),
  lastname: string({ required_error: 'El apellido es requerido' }),
  email: string({ required_error: 'El email es requerido' }).email('Ingrese un correo electrónico válido'),
  password: string({ required_error: 'El campo es requerido' }),
  confirmPassword: string({ required_error: 'El campo es requerido' })
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: 'La contraseña no coincide',
  path: ['confirmPassword']
})
