import { BlogsRepository } from '../repositories/blogs-in-memory-repository';
import { PostsRepository } from '../repositories/posts-in-memory-repository';
import express, {Request, Response} from 'express';

export const routerTesting = express.Router();

routerTesting.delete('/all-data', async (req: Request, res: Response) => {
	BlogsRepository.deleteAllBlogs();
	PostsRepository.deleteAllBPosts();
	res.sendStatus(204);
})
