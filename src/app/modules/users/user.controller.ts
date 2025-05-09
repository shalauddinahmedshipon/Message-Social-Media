import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUser = catchAsync(async (req, res) => {
 const result = await userService.getUserAllFromDB();
  sendResponse(
    res,
    {
    message: 'retrieve users successfully',
    statusCode: StatusCodes.OK,
    data:result
  });
});

const getSingleUser = catchAsync(async (req, res) => {
 const result = await userService.getSingleUserFromDB(req.params.id);
  sendResponse(
    res,
    {
    message: 'retrieve user successfully',
    statusCode: StatusCodes.OK,
    data:result
  });
});

const updateProfile = catchAsync(async (req, res) => {
 const result = await userService.updateUserProfileInFromDB(req.params.id,req.body);
  sendResponse(
    res,
    {
    message: 'update user successfully',
    statusCode: StatusCodes.OK,
    data:result
  });
});

const requestRoleUpgrade = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { requestedRole } = req.body;
const result = await userService.requestRoleUpgrade(userId,requestedRole)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Role upgrade request submitted',
    data:result,
  });
});

export const userController={
  getAllUser,
  getSingleUser,
  updateProfile,
  requestRoleUpgrade
}