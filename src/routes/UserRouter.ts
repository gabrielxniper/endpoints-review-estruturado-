import express from 'express'
import { UserController } from '../controller/UserController';


export const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/create', userController.createUser);

userRouter.get('/age-range', userController.getUsersByAgeRange);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getUserById);//1


userRouter.put('/:id', userController.putUserById);

userRouter.delete('/cleanup-inactive', userController.cleanupInactiveUsers);

userRouter.delete('/:id', userController.deleteUserById);



