import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";

const registerUserIntoDB=async(payload:TUser)=>{
  const result = await User.create(payload);
  return result;
}

export const authService ={
  registerUserIntoDB
}