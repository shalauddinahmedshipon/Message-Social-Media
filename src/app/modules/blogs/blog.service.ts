import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface"
import { Blog } from "./blog.model"


const createBlogIntoDB=async(payload:TBlog)=>{
const result = (await Blog.create(payload)).populate('author');
return result;
}


const getAllBlogsFromDB=async(query:Record<string,unknown>)=>{
      //  search operation 
let search='';
if(query?.search){
search=query?.search as string
}

const searchableFields=["title","content"];
const searchQuery =Blog.find(
  {
    $or:searchableFields.map((field)=>({
    [field]:{$regex:search,$options:'i'}
    }))
  }
);


         //  filter operation
let filter = {};
if(query?.filter){
  filter={author:query?.filter} 
}
const filterQuery = searchQuery.find(filter);

        //  sort operation 
let sortStr = "-createdAt";
if(query?.sortBy && query?.sortOrder){
 const sortBy=query?.sortBy;
 const sortOrder=query?.sortOrder;
 sortStr=`${sortOrder==='desc'?'-':''}${sortBy}`;
}

const sortQuery = await filterQuery.sort(sortStr);


return sortQuery;
}


const updateBlogFromDB=async(blogId:string,payload:Partial<TBlog>,userId:string)=>{
const isBlogExist= await Blog.findById(blogId);
if(!isBlogExist){
  throw new AppError(StatusCodes.NOT_FOUND,"The blog can not found") 
}
if(isBlogExist&&!isBlogExist.author.equals(userId)){
throw new AppError(StatusCodes.UNAUTHORIZED,"You can only update your blogs!")
}
const result = await Blog.findByIdAndUpdate(blogId,payload,{new:true});
return result;
}


const deleteBlogFromDB=async(blogId:string,userId:string)=>{
const isBlogExist= await Blog.findById(blogId);
if(!isBlogExist){
  throw new AppError(StatusCodes.NOT_FOUND,"The blog can not found") 
}
if(isBlogExist&&!isBlogExist.author.equals(userId)){
throw new AppError(StatusCodes.UNAUTHORIZED,"You can only delete your blogs!")
}

const result = await Blog.findByIdAndDelete(blogId);
return result;
}


export const blogService={
  createBlogIntoDB,
  updateBlogFromDB,
  deleteBlogFromDB,
  getAllBlogsFromDB
}