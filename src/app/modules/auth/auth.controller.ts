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

const loginUser = catchAsync(
  async(req,res)=>{
    const result = await authService.loginUser(req.body);
  sendResponse(res,{
  success: true,
  message: "Login successful",
  statusCode: StatusCodes.OK,
  data: result
  })  

  }
)



export const authController={
  registerUser,
  loginUser
}
