import { z } from 'zod';
import { countries } from './user.constant';

const createUserValidationSchema = z.object({
  body:z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(6, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  dateOfBirth: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'Invalid date format' }
  ),
  religion: z.enum(['muslim', 'non-muslim']),
  role: z.enum(['user', 'scholar', 'admin']).optional(),
  gender: z.enum(['male', 'female']),
  profileImageUrl: z
    .string()
    .url('Invalid URL format')
    .optional(),
  country: z.enum(countries as [string, ...string[]]),
  biography: z.string().optional(),
  })
});


const updateUserValidationSchema = z.object({
 body:z.object({
  name: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
    .optional(),
  religion: z.enum(['muslim', 'non-muslim']).optional(),
  role: z.enum(['user', 'scholar', 'admin']).optional(),
  gender: z.enum(['male', 'female']).optional(),
  profileImageUrl: z
    .string()
    .url('Invalid URL format')
    .optional(),
  country: z.enum(countries as [string, ...string[]]).optional(),
  biography: z.string().optional(),
 })
});


export const userValidation = { createUserValidationSchema,updateUserValidationSchema };
