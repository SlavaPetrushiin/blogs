import { checkAuth } from '../utils/checkAuth';
import express, {Request, Response} from 'express';
import { ApiTypes } from '../types/types';
import { checkError } from '../utils/checkError';
import { createAndUpdatePostsValidator } from '../validators/postsValidator';
import { PostService } from '../services/posts_service';


export const routerPosts = express.Router();

routerPosts.get('/', async (req: Request, res: Response) => {
	let posts = await PostService.getAllPosts();
	res.send(posts);
})

routerPosts.post('/', checkAuth, createAndUpdatePostsValidator, checkError, async (req: Request<{}, {}, ApiTypes.ParamsCreatePost>, res: Response<ApiTypes.IPost | boolean>) => {
	let {blogId, content, shortDescription, title, createdAt} = req.body;
	let newPost = await PostService.createPost({blogId, content, shortDescription, title, createdAt});

	if(!newPost){
		return res.sendStatus(404);
	}
	res.status(201).send(newPost);
})

routerPosts.get('/:id', async (req: Request<{id: string}>, res: Response<ApiTypes.IPost | boolean>) => {
	let id = req.params.id;
	let foundedPost = await PostService.getOnePost(id);
	if(!foundedPost){
		return res.sendStatus(404);
	}

	res.send(foundedPost);
})

routerPosts.put('/:id', checkAuth, createAndUpdatePostsValidator, checkError, async (req: Request<{id: string}, {}, Omit<ApiTypes.ParamsUpdatePost, 'id'>>, res: Response) => {
	let {blogId,content, shortDescription, title, createdAt} = req.body;
	let {id} = req.params;
	let isUpdatedBPost = await PostService.updatePost({id, blogId, content, shortDescription, title, createdAt});
	if(!isUpdatedBPost){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerPosts.delete('/:id', checkAuth, async (req: Request<{id: string}>, res: Response) => {
	let {id} = req.params;
	let isDeletesPost = await PostService.deletePost(id);
	if(!isDeletesPost){
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})