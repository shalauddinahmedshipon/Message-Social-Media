

import { Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  thumbnailUrl?: string;
  category: Types.ObjectId; 
  author: Types.ObjectId; 
  isPublished: boolean;
  isDeleted:boolean;
  likes?: Types.ObjectId[]; 
  comments?: Types.ObjectId[]; 
}
