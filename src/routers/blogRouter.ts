import { PostService } from './../services/posts_service';
import { createAndUpdateBlogValidator } from './../validators/blogsValidator';
import { checkAuth } from './../utils/checkAuth';
import express, {Request, Response} from 'express';
import { ApiTypes } from '../types/types';
import { checkError } from '../utils/checkError';
import { PostsRepository } from '../repositories/posts-db-repository';
import { BlogsService } from '../services/blogs_service';

export const routerBlogs = express.Router();

routerBlogs.get('/', async (req: Request, res: Response) => {
	let blogs = await BlogsService.getAllBlogs();
	res.send(blogs);
})

routerBlogs.post('/', checkAuth, createAndUpdateBlogValidator, checkError, async (req: Request<{}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response<ApiTypes.IBlog | boolean>) => {
	let {name, youtubeUrl} = req.body;
	let newBlog = await BlogsService.createBlog(name, youtubeUrl);
	if (!newBlog) return res.sendStatus(400);
	return res.status(201).send(newBlog);
})

routerBlogs.get('/:id', async (req: Request<{id: string}>, res: Response) => {
	let id = req.params.id;
	let blog = await BlogsService.getOneBlog(id);
	if(!blog){
		return res.sendStatus(404);
	}

	return res.send(blog);
})

routerBlogs.put('/:id', checkAuth, createAndUpdateBlogValidator, checkError, async (req: Request<{id: string}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response) => {
	let {name, youtubeUrl} = req.body;
	let {id} = req.params;
	let isUpdatedBlog = await BlogsService.updateBlog({id, name, youtubeUrl});
	if(!isUpdatedBlog){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerBlogs.delete('/:id', checkAuth, async (req: Request<{id: string}>, res: Response) => {
	let {id} = req.params;
	let isDeletesBlog = await BlogsService.deleteBlog(id);
	if(!isDeletesBlog){
		return res.sendStatus(404); 
	}

	PostService.removeAllPostsAndBlog(id);
	res.sendStatus(204);
})