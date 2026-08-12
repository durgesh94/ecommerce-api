import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),

  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),

  email: z.string().email('Invalid email address'),

  password: z.string().min(8, 'Password must be at least 8 characters'),

  role: z.enum(['USER', 'ADMIN']).optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50).optional(),

  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50).optional(),

  email: z.string().email('Invalid email address').optional(),

  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
});

export const userEmailParamSchema = z.object({
  email: z.string().email('Invalid email address'),
});
