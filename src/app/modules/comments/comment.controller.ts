import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { commentService } from './comment.service';

export const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.createComment({
    ...req.body,
    author: req.user._id,
  });

  sendResponse(res, {
    statusCode:StatusCodes.CREATED,
    message: 'Comment created successfully',
    data: result,
  });
});

export const getCommentsByBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.getCommentsByBlog(req.params.blogId);

  sendResponse(res, {
    statusCode:StatusCodes.OK,
    message: 'Comments fetched successfully',
    data: result,
  });
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.updateComment(req.params.id, req.body);

  sendResponse(res, {
    statusCode:StatusCodes.OK,
    message: 'Comment updated successfully',
    data: result,
  });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  await commentService.deleteComment(req.params.id);

  sendResponse(res, {
    statusCode:StatusCodes.OK,
    message: 'Comment deleted successfully',
  });
});
