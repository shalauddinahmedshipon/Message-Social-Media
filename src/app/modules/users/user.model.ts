import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import { IUser, UserModel } from './user.interface';
import { countries } from './user.constant';

const userSchema= new Schema<IUser,UserModel>(
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
      enum: ['User', 'Scholar', 'Admin'],
      default: 'User',
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



userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isUserExistByPhone = async function (phone: string) {
  return await User.findOne({ phone }).select("+password");
};


userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};


export const User = model<IUser,UserModel>('User', userSchema);
