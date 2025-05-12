import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    thumbnailUrl: z.string().url('Invalid URL format').optional(),
    category: z.string({ required_error: 'Category ID is required' }),  
    isPublished: z.boolean().optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    thumbnailUrl: z.string().url('Invalid URL format').optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});


export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
