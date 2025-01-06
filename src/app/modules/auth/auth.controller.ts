import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from 'http-status-codes';
import { authService } from "./auth.services";

const registerUser = catchAsync(async(req,res)=>{
  const payload = req.body;
  const result = await authService.registerUserIntoDB(payload);

  sendResponse(res,{
  message:"User Register Successfully",
  statusCode:StatusCodes.CREATED,
  data:{
    _id:result?._id,
    name:result?.name,
    email:result?.email
  }
  })

})

export const authController={
  registerUser
}
