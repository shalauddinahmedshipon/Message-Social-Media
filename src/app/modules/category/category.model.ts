import  { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({

  name:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

export const Category = model<ICategory>('Category',categorySchema);