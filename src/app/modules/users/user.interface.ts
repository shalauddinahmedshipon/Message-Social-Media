import { USER_ROLE } from './user.constant';

import { Model, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password:string;
  dateOfBirth: Date;
  religion: 'muslim' | 'non-muslim';
  role: 'User' | 'Scholar' | 'Admin';
  gender: 'male' | 'female';
  profileImageUrl?: string; 
  isDeleted: boolean; 
  isBlocked: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  country: string;
  biography: string;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface UserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser>;
  isUserExistByPhone(phone: string): Promise<IUser>;
  isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}


export type TUserRole = keyof typeof USER_ROLE;
