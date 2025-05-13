// import { StatusCodes } from 'http-status-codes';
// import AppError from '../../error/AppError';
// import { TBlog } from './blog.interface';
// import { Blog } from './blog.model';

// const createBlogIntoDB = async (payload: TBlog) => {
//   const result = (await Blog.create(payload)).populate('author');
//   return result;
// };

// const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
//   //  search operation
//   let search = '';
//   if (query?.search) {
//     search = query?.search as string;
//   }

//   const searchableFields = ['title', 'content'];
//   const searchQuery = Blog.find({
//     $or: searchableFields.map((field) => ({
//       [field]: { $regex: search, $options: 'i' },
//     })),
//   });

//   //  filter operation
//   let filter = {};
//   if (query?.filter) {
//     filter = { author: query?.filter };
//   }
//   const filterQuery = searchQuery.find(filter);

//   //  sort operation
//   let sortStr = '-createdAt';
//   if (query?.sortBy && query?.sortOrder) {
//     const sortBy = query?.sortBy;
//     const sortOrder = query?.sortOrder;
//     sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
//   }

//   const sortQuery = await filterQuery.sort(sortStr);

//   return sortQuery;
// };





// export const blogService = {
//   createBlogIntoDB,
//   updateBlogFromDB,
//   deleteBlogFromDB,
//   getAllBlogsFromDB,
// };

// src/app/modules/blogs/blog.service.ts
import { Blog } from './blog.model';
import { IBlog } from './blog.interface';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import { Category } from '../category/category.model';

const createBlog = async (payload: IBlog) => {
  const isCategoryExist = await Category.findById(payload.category);
  if(!isCategoryExist){ throw new AppError(StatusCodes.BAD_REQUEST,"The Category does not exist")}
  return await Blog.create(payload);
};

const getAllBlogs = async () => {
  return await Blog.find().populate('author').populate('category').populate('likes').populate('comments');
};

const getSingleBlog = async (id: string) => {
  const isBlogExist =await Blog.findById(id).populate('author').populate('category');
  if(!isBlogExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"The Blog does not exist")
  }
  return isBlogExist
};

const updateBlog = async (
  blogId: string,
  payload: Partial<IBlog>,
  userId: string,
) => {
  console.log(userId)
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The blog can not found');
  }
  if (isBlogExist && !isBlogExist.author.equals(userId)) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can only update your blogs!',
    );
  }
  const result = await Blog.findByIdAndUpdate(blogId, payload, { new: true });
  return result;
};

const deleteBlog = async (blogId: string, userId: string) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The blog can not found');
  }
  if (isBlogExist && !isBlogExist.author.equals(userId)) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can only delete your blogs!',
    );
  }

  const result = await Blog.findByIdAndUpdate(blogId,{isDeleted:true},{new:true});
  return result;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
