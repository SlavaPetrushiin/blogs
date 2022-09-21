import { BlogsRepository } from './../repositories/blogsRepository';
import express, {Request, Response} from 'express';
import { ApiTypes } from '../types/types';

export const routerBlogs = express.Router();

routerBlogs.get('/', (req: Request, res: Response) => {
	let blogs = BlogsRepository.getAllBlogs();
	res.send(blogs);
})

routerBlogs.post('/', (req: Request<{}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response<ApiTypes.IBlog>) => {
	let {name, youtubeUrl} = req.body;
	let newBlog = BlogsRepository.createBlog({name, youtubeUrl});
	res.send(newBlog);
})

routerBlogs.get('/:id', (req: Request<{id: string}>, res: Response) => {
	let id = req.params.id;
	let blog = BlogsRepository.getOneBlog(id);
	if(!blog){
		return res.sendStatus(404);
	}

	res.send(blog);
})

routerBlogs.put('/:id', (req: Request<{id: string}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response) => {
	let {name, youtubeUrl} = req.body;
	let {id} = req.params;
	let isUpdatedBlog = BlogsRepository.updateBlog({id, name, youtubeUrl});
	if(!isUpdatedBlog){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerBlogs.delete('/:id', (req: Request<{id: string}>, res: Response) => {
	let {id} = req.params;
	let isDeletesBlog = BlogsRepository.deleteBlog(id);
	if(!isDeletesBlog){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})