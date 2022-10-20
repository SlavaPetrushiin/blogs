import { db } from './../repositories/db';
import { BlogsRepository } from '../repositories/blogs-db-repository';
import { PostsRepository } from '../repositories/posts-db-repository';
import express, {Request, Response} from 'express';

export const routerTesting = express.Router();

routerTesting.delete('/all-data', async (req: Request, res: Response) => {
	await BlogsRepository.deleteAllBlogs();
	await PostsRepository.deleteAllBPosts();
	res.sendStatus(204);
})
