import { Category } from './category.model';
import { ICategory } from './category.interface';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';

const createCategory = async (payload: ICategory) => {
  const existing = await Category.findOne({ name: payload.name });
  if (existing) {
    throw new AppError(StatusCodes.CONFLICT, 'Category already exists');
  }
  const category = await Category.create(payload);
  return category;
};

const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

const getSingleCategory = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }
  return category;
};


const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
) => {
  if (payload.name) {
    const existingCategory = await Category.findOne({ name: payload.name });
    if (existingCategory && existingCategory._id.toString() !== id) {
      throw new AppError(StatusCodes.CONFLICT, 'Category name already exists');
    }
  }

  const category = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return category;
};


const deleteCategory = async (id: string) => {
  const category = await Category.findByIdAndUpdate(id,{isDeleted:true},{new:true});
  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }
  return category;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory
};
