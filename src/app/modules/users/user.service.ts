import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB=async(payload:TUser)=>{
  payload.role="admin";
  const result = await User.create(payload);
  return result;
}

export const userService ={
  createUserIntoDB
}