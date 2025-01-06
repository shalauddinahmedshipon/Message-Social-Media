import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { StatusCodes } from 'http-status-codes';

const createAdmin = catchAsync(async(req,res)=>{
  const payload = req.body;
  const result = await userService.createAdminIntoDB(payload);

  sendResponse(res,{
  message:"Admin Created Successfully",
  statusCode:StatusCodes.OK,
  data:result
  })

})

export const userController={
  createAdmin
}
