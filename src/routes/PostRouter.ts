import express from 'express';
import { PostController } from '../controller/PostController';

export const postRouter = express.Router();

const postController = new PostController();


postRouter.post('/', postController.postValidations);
postRouter.patch('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);
