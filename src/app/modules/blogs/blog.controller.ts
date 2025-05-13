import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  payload.author = id;
  const result = await blogService.createBlog(payload);
  sendResponse(res, {
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result
  });
});
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogs();
  sendResponse(res, {
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result
  });
});

const getSingleBlog= catchAsync(async (req, res) => {
  const result = await blogService.getSingleBlog(req.params.id);
  sendResponse(res, {
    message: 'Blog fetched successfully',
    statusCode: StatusCodes.OK,
    data: result
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  payload.author = id;
  const result = await blogService.updateBlog(req.params.id, payload, id);
  sendResponse(res, {
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
 const result= await blogService.deleteBlog(id,req.user.id);
  sendResponse(res, {
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data:result
  });
});


export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog
};
