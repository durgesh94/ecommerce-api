import { UserService } from './user.service';
import { UserResponseDto } from './user.dto';
import { asyncHandler } from '../../common/utils/async-handler';
import { ApiResponse } from '../../common/utils/api-response';

export class UserController {
  constructor(private readonly userService = new UserService()) {}

  registerUser = asyncHandler(async (req, res) => {
    const userData = req.body;
    const user = await this.userService.createUser(userData);
    ApiResponse.success(res, new UserResponseDto(user), 'User registered successfully', 201);
  });

  getUserByEmail = asyncHandler(async (req, res) => {
    const { email }: any = req.params;
    const user = await this.userService.findUserByEmail(email);
    ApiResponse.success(res, new UserResponseDto(user), 'User found');
  });

  getUserById = asyncHandler(async (req, res) => {
    const { id }: any = req.params;
    const user = await this.userService.findUserById(id);
    ApiResponse.success(res, new UserResponseDto(user), 'User found');
  });

  getAllUsers = asyncHandler(async (_req, res) => {
    const users = await this.userService.getAllUsers();
    ApiResponse.success(
      res,
      users.map((user) => new UserResponseDto(user)),
      'Users retrieved successfully',
      200,
    );
  });

  updateUser = asyncHandler(async (req, res) => {
    const { id }: any = req.params;
    const updateData = req.body;
    const updatedUser = await this.userService.updateUser(id, updateData);
    ApiResponse.success(res, new UserResponseDto(updatedUser), 'User updated successfully');
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { id }: any = req.params;
    await this.userService.deleteUser(id);
    ApiResponse.success(res, null, 'User deleted successfully');
  });
}
