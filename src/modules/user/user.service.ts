import bcrypt from 'bcryptjs';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { AppError } from '../../common/errors/app-error';

export class UserService {
  private userRepository: UserRepository = new UserRepository();

  async createUser(userData: CreateUserDto): Promise<any> {
    // Check if a user with the same email already exists
    const existingUser = await this.userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userToCreate = { ...userData, password: hashedPassword };

    const createdUser = await this.userRepository.createUser(userToCreate);
    return createdUser;
  }

  async findUserByEmail(email: string) {
    // Check if the user exists before returning
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async findUserById(id: string) {
    // Check if the user exists before returning
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(id: string, updateData: Partial<CreateUserDto>) {
    // Check if the user exists before updating
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    // Check if a user with the same email already exists
    const existingUser = await this.userRepository.findUserByEmail(updateData?.email ?? '');
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }
    // Hash the password before updating the user if password is provided
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }
    const updatedUser = await this.userRepository.updateUser(id, updateData);
    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) {
      throw new AppError('User not found', 404);
    }
    return;
  }
}
