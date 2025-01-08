import mongoose, { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
  title:{
    type:String,
    required:true,
  },
  content:{
    type:String,
    required:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  isPublished:{
    type:Boolean,
    default:true
  }
},
{
  timestamps:true
});

export const Blog = model<TBlog>('Blog',blogSchema);