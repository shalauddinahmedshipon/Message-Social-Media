import { z } from 'zod';

const blogValidationSchema = z.object({
  body:z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    author: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId'),
    isPublished: z.boolean().default(true),
  }
  )
});


export const blogValidation= {blogValidationSchema};
