import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../users/user.model';
import { Blog } from '../blogs/blog.model';
import { TUser } from '../users/user.interface';
import { USER_ROLE } from '../users/user.constant';

const createAdminIntoDB = async (payload: TUser) => {
  const isAdminExist = await User.findOne({ role: USER_ROLE.admin });
  if (isAdminExist) {
    throw new AppError(StatusCodes.CONFLICT, 'Admin is already Exist!');
  }
  payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

const blockedUserFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The User can not found');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const deleteBlogFromDB = async (blogId: string) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The blog can not found');
  }
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const adminService = {
  blockedUserFromDB,
  deleteBlogFromDB,
  createAdminIntoDB,
};
