import { z } from 'zod';
import { createUserSchema, updateUserSchema, userRoleSchema } from './user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UserRole = z.infer<typeof userRoleSchema>;

export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
