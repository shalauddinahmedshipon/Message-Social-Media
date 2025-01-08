import { TBlog } from "./blog.interface"
import { Blog } from "./blog.model"


const createBlogIntoDB=async(payload:TBlog)=>{
console.log(payload);
const result = (await Blog.create(payload))
return result;
}


export const blogService={
  createBlogIntoDB
}