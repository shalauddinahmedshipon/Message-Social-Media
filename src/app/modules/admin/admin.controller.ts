import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';



const getRoleRequests = catchAsync(async (req, res) => {
  const result = await adminService.getRoleRequestsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Pending role requests retrieved',
    data: result,
  });
});

const blockedUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await adminService.blockedUserFromDB(id);
  sendResponse(res, {
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await adminService.deleteBlogFromDB(id);
  sendResponse(res, {
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  await adminService.updateUserRoleFromDB(id,role);
  sendResponse(res, {
    message: 'User Role is updated successfully',
    statusCode: StatusCodes.OK,
  });
});

const approveRoleRequest = catchAsync(async (req, res) => {
  const {id} = req.params;
 await adminService.approveRoleRequest(id);
  sendResponse(res, {
    message: 'User Role approved successfully',
    statusCode: StatusCodes.OK
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await adminService.deleteUserFromDB(id);
  sendResponse(res, {
    message: 'User deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const adminController = {
  blockedUser,
  deleteBlog,
  deleteUser,
  updateUserRole,
  approveRoleRequest,
  getRoleRequests
};
