import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../users/user.model';
import { Blog } from '../blogs/blog.model';
import { USER_ROLE } from '../users/user.constant';
import { IUser } from '../users/user.interface';

const createAdminIntoDB = async (payload: IUser) => {
  const isAdminExist = await User.findOne({ role: USER_ROLE.Admin });
  if (isAdminExist) {
    throw new AppError(StatusCodes.CONFLICT, 'Admin is already Exist!');
  }
  payload.role = 'Admin';
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


const updateUserRoleFromDB = async (userId: string,role:"Admin"|"User"|"Scholar") => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The User can not found');
  }
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The User is already deleted');
  }
  const result = await User.findByIdAndUpdate(userId,{role:role},{runValidators:true});
  return result;
};


const deleteUserFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The User can not found');
  }
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The User can not already deleted');
  }
  const result = await User.findByIdAndUpdate(userId,{isDeleted:true},{runValidators:true});
  return result;
};

export const adminService = {
  blockedUserFromDB,
  deleteBlogFromDB,
  createAdminIntoDB,
  deleteUserFromDB,
  updateUserRoleFromDB 
};
