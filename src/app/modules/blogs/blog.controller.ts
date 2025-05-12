import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const payload = req.body;
  payload.author = _id;
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
  const { id } = req.params;
  const { _id } = req.user;
  const payload = req.body;
  payload.author = _id;
  const result = await blogService.updateBlog(id, payload, _id);
  sendResponse(res, {
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  await blogService.deleteBlog(id, _id);
  sendResponse(res, {
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});


export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
   getSingleBlog
};
