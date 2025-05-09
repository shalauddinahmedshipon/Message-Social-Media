import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { authService } from './auth.services';

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.registerUserIntoDB(payload);

  sendResponse(res, {
    message: 'Register Successfully',
    statusCode: StatusCodes.CREATED,
    data: result
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});



const changePassword = catchAsync(async (req, res) => {
  const userData = req.user;
  const passwordData = req.body;
  const result = await authService.changePasswordIntoDB(
    userData,
    passwordData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Password is changed successfully',
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
  changePassword
};
