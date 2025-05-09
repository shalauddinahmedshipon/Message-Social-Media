import { z } from 'zod';

const authValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    phone: z.string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }).optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({ required_error: 'Old password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const authValidation = { authValidationSchema,changePasswordValidationSchema };
