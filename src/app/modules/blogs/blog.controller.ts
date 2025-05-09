import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const payload = req.body;
  payload.author = _id;
  const result = await blogService.createBlogIntoDB(payload);
  sendResponse(res, {
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: result.author,
    },
  });
});
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogsFromDB(req.query);

  const response = result?.map((blog) => ({
    _id: blog._id,
    title: blog?.title,
    content: blog?.content,
    author: blog?.author,
  }));

  sendResponse(res, {
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: response,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const payload = req.body;
  payload.author = _id;
  const result = await blogService.updateBlogFromDB(id, payload, _id);
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
  await blogService.deleteBlogFromDB(id, _id);
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
};
