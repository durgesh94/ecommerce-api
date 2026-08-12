import { Router } from 'express';
import { UserController } from './user.controller';
import { validate } from '../../common/middleware/validate.middleware';
import { createUserSchema, updateUserSchema } from './user.schema';
import { UserService } from './user.service';

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Route to register a new user
userRouter.post('/', validate(createUserSchema), userController.registerUser);

// Route to get a user by email
userRouter.get('/email/:email', userController.getUserByEmail);

// Route to get a user by ID
userRouter.get('/:id', userController.getUserById);

// Route to get all users
userRouter.get('/', userController.getAllUsers);

// Route to update a user by ID
userRouter.put('/:id', validate(updateUserSchema), userController.updateUser);

// Route to delete a user by ID
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
