import { createAndUpdateBlogValidator } from './../validators/blogsValidator';
import { PostsRepository } from './../repositories/posts-db-repository';
import { ApiTypes } from "../types/types";
import { BlogsService } from './blogs_service';

export interface IUpdatePostParams extends ApiTypes.ICreateAndUpdateBlogParams {
	id: string
}

export class PostService {
	static async getAllPosts(): Promise<ApiTypes.IPost[]> {
		return PostsRepository.getAllPosts();
	}

	static async createPost(params: ApiTypes.ICreateAndUpdateBlogParams): Promise<ApiTypes.IPost | boolean> {
		try {
			let { blogId, content, shortDescription, title } = params;
			let foundedBlog = await BlogsService.getOneBlog(blogId);

			if (!foundedBlog) {
				return false;
			}

			let newPost: ApiTypes.IPost = {
				id: (new Date().getMilliseconds()).toString(),
				title,
				shortDescription,
				content,
				blogId,
				blogName: foundedBlog.name,
				createdAt: new Date().toISOString()
			}

			return await PostsRepository.createPost(newPost);
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async getOnePost(id: string): Promise<ApiTypes.IPost | boolean> {
		return PostsRepository.getOnePost(id);
	}

	static async updatePost(params: IUpdatePostParams): Promise<boolean> {
		try {
			let { blogId, id } = params;
			let foundedPost = await PostService.getOnePost(id);
			let foundedBlog = await BlogsService.getOneBlog(blogId);
	
			if (!foundedBlog || !foundedPost) {
				return false;
			}

			return await PostsRepository.updatePost(params);

		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async deletePost(id: string): Promise<boolean> {
		return PostsRepository.deletePost(id);
	}

	static async deleteAllBPosts(): Promise<void> {
		await PostsRepository.deleteAllBPosts();
	}

	static async removeAllPostsAndBlog(blogId: string): Promise<void> {
		await PostsRepository.removeAllPostsDeletedBlog(blogId);
	}
}