import { PostsRepository } from '../repositories/posts-db-repository';
import { checkAuth } from '../utils/checkAuth';
import express, {Request, Response} from 'express';
import { ApiTypes } from '../types/types';
import { checkError } from '../utils/checkError';
import { createAndUpdatePostsValidator } from '../validators/postsValidator';

export const routerPosts = express.Router();

routerPosts.get('/', async (req: Request, res: Response) => {
	let posts = await PostsRepository.getAllPosts();
	res.send(posts);
})

routerPosts.post('/', checkAuth, createAndUpdatePostsValidator, checkError, async (req: Request<{}, {}, ApiTypes.ParamsCreatePost>, res: Response<ApiTypes.IPost>) => {
	let {blogId, content, shortDescription, title} = req.body;
	let newPost = await PostsRepository.createPost({blogId, content, shortDescription, title});

	if(!newPost){
		return res.sendStatus(404);
	}
	res.status(201).send(newPost);
})

routerPosts.get('/:id', async (req: Request<{id: string}>, res: Response<ApiTypes.IPost>) => {
	let id = req.params.id;
	let foundedPost = await PostsRepository.getOnePost(id);
	if(!foundedPost){
		return res.sendStatus(404);
	}

	res.send(foundedPost);
})

routerPosts.put('/:id', checkAuth, createAndUpdatePostsValidator, checkError, async (req: Request<{id: string}, {}, Omit<ApiTypes.ParamsUpdatePost, 'id'>>, res: Response) => {
	let {blogId,content, shortDescription, title} = req.body;
	let {id} = req.params;
	let isUpdatedBPost = await PostsRepository.updatePost({id, blogId, content, shortDescription, title});
	if(!isUpdatedBPost){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerPosts.delete('/:id', checkAuth, async (req: Request<{id: string}>, res: Response) => {
	let {id} = req.params;
	let isDeletesPost = await PostsRepository.deletePost(id);
	if(!isDeletesPost){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})