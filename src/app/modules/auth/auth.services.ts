import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { TUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLogin) => {
  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
  }
  if (user?.isBlocked)
    throw new AppError(StatusCodes.FORBIDDEN, 'The user is blocked!');

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials!');
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expireIn,
  });

  return {
    token,
  };
};

export const authService = {
  registerUserIntoDB,
  loginUser,
};
