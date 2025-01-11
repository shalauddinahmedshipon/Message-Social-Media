import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";  
import config from "../../config";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";

const userSchema = new Schema<TUser>({
  name:{
    type:String,
    required:true 
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    select:0
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



userSchema.pre('save',async function (next) {
  const email = this.email;
  const isExistUser = await User.findOne({email});
  if(isExistUser){
   throw new AppError(StatusCodes.CONFLICT,"The user is already exist");
  }
  this.password= await bcrypt.hash(
  this.password,Number(config.bcrypt_solt)
  )
  next();
})

userSchema.post('save',function(doc,next){
  doc.password='';
  next();
})



export const User = model<TUser>("User",userSchema);

