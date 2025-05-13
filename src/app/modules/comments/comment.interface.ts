import { Types } from 'mongoose';

export interface IComment {
  content: string;
  author: Types.ObjectId;
  blog: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
