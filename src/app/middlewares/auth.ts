import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/users/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, email, role } = decoded;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }
    if (user?.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'The user is blocked!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
