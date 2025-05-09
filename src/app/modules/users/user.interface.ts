import { USER_ROLE } from './user.constant';

import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password:string;
  dateOfBirth: Date;
  religion: 'muslim' | 'non-muslim';
  role: 'user' | 'scholar' | 'admin';
  gender: 'male' | 'female';
  profileImageUrl?: string; 
  isDeleted: boolean; 
  isBlocked: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  country: string;
  biography: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export type TUserRole = keyof typeof USER_ROLE;
