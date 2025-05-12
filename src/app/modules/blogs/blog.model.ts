import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Blog = model<IBlog>('Blog', blogSchema);
