import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../users/user.model';
import { Blog } from '../blogs/blog.model';

const getRoleRequestsFromDB = async () => {
const result = await User.find({ requestedRole: { $ne: null } });
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

const approveRoleRequest = async(userId:string)=>{
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');

  if (user.requestedRole !== 'Scholar') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'No Scholar request to approve');
  }

  user.role = 'Scholar';
  user.requestedRole = null;
  await user.save();
  return 
}



export const adminService = {
  blockedUserFromDB,
  deleteBlogFromDB,
  deleteUserFromDB,
  updateUserRoleFromDB,
  approveRoleRequest,
  getRoleRequestsFromDB
};
