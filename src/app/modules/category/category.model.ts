import  { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
  _id:{
    type:Schema.Types.ObjectId
  },
  name:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
},{timestamps:true})

export const Category = model<ICategory>('Category',categorySchema);