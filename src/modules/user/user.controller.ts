import { Request } from 'express';
import { UserService } from './user.service';
import { asyncHandler } from '../../common/utils/async-handler';
import { ApiResponse } from '../../common/utils/api-response';
import { UserMapper } from './user.mapper';
import { CreateUserDto } from './user.dto';

export class UserController {
  constructor(private readonly userService: UserService) {}

  registerUser = asyncHandler(async (req, res) => {
    const userData: CreateUserDto = req.body;
    const user = await this.userService.createUser(userData);
    ApiResponse.success(res, UserMapper.toResponse(user), 'User registered successfully', 201);
  });

  getUserByEmail = asyncHandler(async (req: Request<{ email: string }>, res) => {
    const { email } = req.params;
    const user = await this.userService.findUserByEmail(email);
    ApiResponse.success(res, UserMapper.toResponse(user), 'User found');
  });

  getUserById = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { id } = req.params;
    const user = await this.userService.findUserById(id);
    ApiResponse.success(res, UserMapper.toResponse(user), 'User found');
  });

  getAllUsers = asyncHandler(async (_req, res) => {
    const users = await this.userService.getAllUsers();
    ApiResponse.success(
      res,
      users.map((user) => UserMapper.toResponse(user)),
      'Users retrieved successfully',
      200,
    );
  });

  updateUser = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await this.userService.updateUser(id, updateData);
    ApiResponse.success(res, UserMapper.toResponse(updatedUser), 'User updated successfully');
  });

  deleteUser = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { id } = req.params;
    await this.userService.deleteUser(id);
    ApiResponse.success(res, null, 'User deleted successfully');
  });
}
