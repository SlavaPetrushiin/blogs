import { BlogsRepository } from './../repositories/blogsRepository';
import { PostsRepository } from './../repositories/postsRepository';
import { checkAuth } from '../utils/checkAuth';
import express, {Request, Response} from 'express';
import { ApiTypes } from '../types/types';
import { checkError } from '../utils/checkError';
import { createAndUpdatePostsValidator } from '../validators/postsValidator';

export const routerTesting = express.Router();

routerTesting.delete('/all-data', async (req: Request, res: Response) => {
	BlogsRepository.deleteAllBlogs();
	PostsRepository.deleteAllBPosts();
	res.sendStatus(204);
})
