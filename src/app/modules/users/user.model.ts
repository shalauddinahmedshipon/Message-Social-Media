import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import { IUser } from './user.interface';
import { countries } from './user.constant';

const userSchema= new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    religion: {
      type: String,
      enum: ['muslim', 'non-muslim'],
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'scholar', 'admin'],
      default: 'user',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    country: {
      type: String,
      enum:countries,
      required: true,
    },
    biography: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);


// Pre-save validation for profile image (if provided)
userSchema.pre('save', function (next) {
  if (this.profileImageUrl && this.gender !== 'male') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Only male users are allowed to upload profile images.');
  }
  next();
});


//hash password before save into DB
userSchema.pre('save', async function (next) {
  const email = this.email;
  const isExistUser = await User.findOne({ email });
  if (isExistUser) {
    throw new AppError(StatusCodes.CONFLICT, 'The user is already exist');
  }
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_solt));
  next();
});

//response empty string password to ensure security
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser>('User', userSchema);
