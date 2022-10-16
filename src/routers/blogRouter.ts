import { createAndUpdateBlogValidator } from './../validators/blogsValidator';
import { checkAuth } from './../utils/checkAuth';
import { BlogsRepository } from '../repositories/blogs-db-repository';
import express, {Request, Response} from 'express';
import { ApiTypes } from '../types/types';
import { checkError } from '../utils/checkError';
import { PostsRepository } from '../repositories/posts-db-repository';

export const routerBlogs = express.Router();

routerBlogs.get('/', async (req: Request, res: Response) => {
	let blogs = await BlogsRepository.getAllBlogs();
	res.send(blogs);
})

routerBlogs.post('/', checkAuth, createAndUpdateBlogValidator, checkError, async (req: Request<{}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response<ApiTypes.IBlog | null>) => {
	let {name, youtubeUrl} = req.body;
	let newBlog = await BlogsRepository.createBlog({name, youtubeUrl});
	res.status(201).send(newBlog);
})

routerBlogs.get('/:id', async (req: Request<{id: string}>, res: Response) => {
	let id = req.params.id;
	let blog = await BlogsRepository.getOneBlog(id);
	if(!blog){
		return res.sendStatus(404);
	}

	res.send(blog);
})

routerBlogs.put('/:id', checkAuth, createAndUpdateBlogValidator, checkError, async (req: Request<{id: string}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response) => {
	let {name, youtubeUrl} = req.body;
	let {id} = req.params;
	let isUpdatedBlog = await BlogsRepository.updateBlog({id, name, youtubeUrl});
	if(!isUpdatedBlog){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerBlogs.delete('/:id', checkAuth, async (req: Request<{id: string}>, res: Response) => {
	let {id} = req.params;
	let isDeletesBlog = await BlogsRepository.deleteBlog(id);
	if(!isDeletesBlog){
		return res.sendStatus(404); 
	}

	PostsRepository.removeAllPostsDeletedBlog(id);
	res.sendStatus(204);
})