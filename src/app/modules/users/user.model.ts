import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name:{
    type:String,
    required:true 
  },
  email:{
    type:String,
    required:true 
  },
  password:{
    type:String,
    required:true 
  },
  isBlocked:{
    type:Boolean,
    default:false
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }
},
{
  timestamps:true
})


export const User = model<TUser>("User",userSchema);

