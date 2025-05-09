import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface"
import { User } from "./user.model";



const getUserAllFromDB = async () => {
  const result = await User.find().select('-password');;
  return result
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).select('-password');;
  return result;
};


const requestRoleUpgrade=async(userId:string,requestedRole:string)=>{
  const isUserExist=await User.findById(userId);
  if(!isUserExist){
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if(isUserExist.religion!=="muslim"){
    throw new AppError(StatusCodes.BAD_REQUEST, 'Only Muslim can be sent Scholar Request!');
  }
  if (requestedRole !== 'Scholar') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Only Scholar role can be requested');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { requestedRole: 'Scholar' },
    { new: true }
  );
return result;
}




const updateUserProfileInFromDB=async(userId:string,updateData:Partial<IUser>)=>{
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Enforce profile image rule
  const newGender = updateData.gender ?? user.gender;
  const newProfileImageUrl = updateData.profileImageUrl;

  if (newProfileImageUrl && newGender !== 'male') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Only male users are allowed to upload profile images'
    );
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Update failed');
  }
  return updatedUser
}

export const userService ={
  updateUserProfileInFromDB,
  getUserAllFromDB,
  getSingleUserFromDB,
  requestRoleUpgrade
}