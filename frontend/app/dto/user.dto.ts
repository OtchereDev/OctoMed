import { z } from 'zod'

const SignupDTO = z
  .object({
    email: z.string().email('Provide a valid email address'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
        'Provide a strong password'
      ),
    confirm_password: z.string(),
    full_name: z.string().min(3, { message: 'Full name is required' }),
    phone_number: z.string().regex(/^\+?[1-9]\d{8,14}$/, { message: 'Phone number is required' }),
    dob: z.string().date('Select a valid date of birth'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

const LoginDTO = z.object({
  email: z.string().email('Provide a valid email address'),
  password: z.string().min(1, 'Provide a password'),
})

const ForgotPasswordDTO = z.object({
  email: z.string().email('Provide a valid email'),
})

export const ResetPasswordDTO = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
        'Provide a strong password'
      ),
    confirm_password: z.string(),
    user: z.number(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type SignupDTOType = z.infer<typeof SignupDTO>
type LoginDTOType = z.infer<typeof LoginDTO>
type ForgotPasswordDTOType = z.infer<typeof ForgotPasswordDTO>

export { ForgotPasswordDTO, LoginDTO, SignupDTO }
export type { ForgotPasswordDTOType, LoginDTOType, SignupDTOType }
