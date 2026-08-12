import { z } from 'zod';
import { createUserSchema, updateUserSchema } from './user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UserRole = 'USER' | 'ADMIN';

export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
