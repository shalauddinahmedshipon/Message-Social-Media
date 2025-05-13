import { z } from 'zod';

const createCommentValidation = z.object({
  body: z.object({
    content: z.string({ required_error: 'Comment content is required' }),
    blog: z.string({ required_error: 'Blog ID is required' }),
  }),
});

const updateCommentValidation = z.object({
  body: z.object({
    content: z.string().optional(),
  }),
});

export const commentValidation = {
  createCommentValidation,
  updateCommentValidation,
};
