import { AppDataSource } from '../../config/database';
import { User } from './user.entity';

export class UserRepository {
  private repository = AppDataSource.getRepository(User); // Get the repository for the User entity

  // Create a new user in the database
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  // Find a user by their email address
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  // Find a user by their ID
  async findUserById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  // Get all users from the database
  async getAllUsers(): Promise<User[]> {
    return await this.repository.find();
  }

  // Update a user's information in the database
  async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      return null; // User not found
    }
    Object.assign(user, updateData); // Update the user with new data
    return await this.repository.save(user); // Save the updated user
  }

  // Delete a user from the database
  async deleteUser(id: string): Promise<boolean> {
    const result: any = await this.repository.delete(id);
    return result.affected !== undefined && result.affected > 0; // Return true if a user was deleted
  }
}
