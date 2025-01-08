import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";

const createBlog=catchAsync(
  
async(req,res)=>{
  const{_id}= req.user;
  const payload = req.body;
  payload.author=_id;
  const result = await blogService.createBlogIntoDB(payload);
  sendResponse(res,{
    message:"Blog created successfully",
    statusCode:StatusCodes.CREATED,
    data:result
  })
}
)

export const blogController={
  createBlog
}