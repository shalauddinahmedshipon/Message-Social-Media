import { Request, Response } from 'express';
import { categoryService } from './category.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.updateCategory(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory
};
