import express from 'express'
import { UserController } from '../controller/UserController';


export const userRouter = express.Router();
const userController = new UserController();

//2
userRouter.get('/age-range', userController.getUsersByAgeRange);
//1
userRouter.get('/:id', userController.getUserById);

userRouter.put('/:id', userController.putUserById);

userRouter.delete('/cleanup-inactive', userController.cleanupInactiveUsers);

