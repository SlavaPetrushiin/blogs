import { QueryRepository } from './../repositories/query-db-repository';
import { PostService } from './../services/posts_service';
import { createAndUpdateBlogValidator, checkBlogValidator, isExistsBlogValidator } from './../validators/blogsValidator';
import { checkAuth } from './../utils/checkAuth';
import express, { Request, Response } from 'express';
import { ApiTypes } from '../types/types';
import { checkError, checkErrorNotFound } from '../utils/checkError';
import { BlogsService } from '../services/blogs_service';
import { checkQueryPostsAndBlogs, IQueryBlogsAndPosts } from '../utils/checkQueryPostsAndBlogs';
import { BlogsRepository } from '../repositories/blogs-db-repository';

export const routerBlogs = express.Router();

routerBlogs.get('/', checkQueryPostsAndBlogs, async (req: Request<{}, {}, {}, IQueryBlogsAndPosts>, res: Response) => {
	let { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = req.query;
	let blogs = await QueryRepository.getAllBlogs({
		searchNameTerm: searchNameTerm!,
		pageNumber: pageNumber!,
		pageSize: pageSize!,
		sortBy: sortBy!,
		sortDirection: sortDirection!
	});
	res.send(blogs);
})

routerBlogs.post('/', checkAuth, createAndUpdateBlogValidator, checkError, async (req: Request<{}, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response<ApiTypes.IBlog | boolean>) => {
	let { name, youtubeUrl } = req.body;
	let newBlog = await BlogsService.createBlog(name, youtubeUrl);
	if (!newBlog) return res.sendStatus(400);
	return res.status(201).send(newBlog);
})

routerBlogs.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
	let id = req.params.id;
	let blog = await BlogsService.getOneBlog(id);
	if (!blog) {
		return res.sendStatus(404);
	}

	return res.send(blog);
})

routerBlogs.get('/:id/posts', checkAuth, checkQueryPostsAndBlogs, async (req: Request<{ id: string }>, res: Response) => {
	let id = req.params.id;
	let blog = await BlogsRepository.getOneBlog(id);
	if(!blog) return res.sendStatus(404);

	let { pageNumber, pageSize, sortBy, sortDirection } = req.query;
	let posts = await QueryRepository.getAllPostsInBlog(id, {
		pageNumber: +pageNumber!,
		pageSize: +pageSize!,
		sortBy: sortBy! as string,
		sortDirection: sortDirection! as string
	});
	if (!posts) {
		return res.sendStatus(404);
	}

	return res.send(posts);
})

routerBlogs.post('/:id/posts', checkAuth, checkBlogValidator, checkError, async (req: Request<{ id: string }, {}, ApiTypes.IBlogPost>, res: Response) => {
	let id = req.params.id;
	let { content, shortDescription, title } = req.body;
	let newPost = await PostService.createPost({ blogId: id, content, shortDescription, title });

	if (!newPost) {
		return res.sendStatus(404);
	}
	res.status(201).send(newPost);
})

routerBlogs.put('/:id', checkAuth, createAndUpdateBlogValidator, checkError, async (req: Request<{ id: string }, {}, ApiTypes.ParamsCreateAndUpdateBlog>, res: Response) => {
	let { name, youtubeUrl, createdAt } = req.body;
	let { id } = req.params;
	let isUpdatedBlog = await BlogsService.updateBlog({ id, name, youtubeUrl, createdAt });
	if (!isUpdatedBlog) {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerBlogs.delete('/:id', checkAuth, async (req: Request<{ id: string }>, res: Response) => {
	let { id } = req.params;
	let isDeletesBlog = await BlogsService.deleteBlog(id);
	if (!isDeletesBlog) {
		return res.sendStatus(404);
	}

	PostService.removeAllPostsAndBlog(id);
	res.sendStatus(204);
})