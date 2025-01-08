import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body:z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    // author: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId'),
    isPublished: z.boolean().default(true),
  }
  )
});
const updateBlogValidationSchema = z.object({
  body:z.object({
    title: z.string().min(1, 'Title is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    // author: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId'),
    isPublished: z.boolean().default(true).optional(),
  }
  )
});


export const blogValidation= {createBlogValidationSchema,updateBlogValidationSchema};
