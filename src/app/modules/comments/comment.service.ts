import { Comment } from './comment.model';
import { Blog } from '../blogs/blog.model';
import { IComment } from './comment.interface';
import mongoose from 'mongoose';

const createComment = async (payload: IComment): Promise<IComment> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const comment = await Comment.create([payload], { session });

    await Blog.findByIdAndUpdate(
      payload.blog,
      { $push: { comments: comment[0]._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return comment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getCommentsByBlog = async (blogId: string): Promise<IComment[]> => {
  return await Comment.find({ blog: blogId }).populate('user', 'name profileImageUrl');
};

const updateComment = async (
  commentId: string,
  payload: Partial<IComment>
): Promise<IComment | null> => {
  return await Comment.findByIdAndUpdate(commentId, payload, { new: true });
};

const deleteComment = async (commentId: string): Promise<IComment | null> => {
  const comment = await Comment.findByIdAndDelete(commentId);

  if (comment) {
    await Blog.findByIdAndUpdate(comment.blog, {
      $pull: { comments: comment._id },
    });
  }

  return comment;
};

export const commentService = {
  createComment,
  getCommentsByBlog,
  updateComment,
  deleteComment,
};
