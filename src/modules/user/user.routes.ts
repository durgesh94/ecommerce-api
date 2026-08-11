import { Router } from 'express';
import { UserController } from './user.controller';
import { validate } from '../../common/validation/validate';
import { registerUserSchema } from './user.validation';

const userRouter = Router();
const userController = new UserController();

// Route to register a new user
userRouter.post('/', validate(registerUserSchema), userController.registerUser);

// Route to get a user by email
userRouter.get('/email/:email', userController.getUserByEmail);

// Route to get a user by ID
userRouter.get('/:id', userController.getUserById);

// Route to get all users
userRouter.get('/', userController.getAllUsers);

// Route to update a user by ID
userRouter.put('/:id', userController.updateUser);

// Route to delete a user by ID
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
