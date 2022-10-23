import { BlogsRepository } from './../repositories/blogs-db-repository';
import { ApiTypes } from "../types/types";

export class BlogsService {
	static async getAllBlogs(): Promise<ApiTypes.IBlog[] | null> {
		return await BlogsRepository.getAllBlogs();
	}

	static async getOneBlog(id: string): Promise<ApiTypes.IBlog | null> {
		return await BlogsRepository.getOneBlog(id);
	}

	static async createBlog(name: string, youtubeUrl: string): Promise<ApiTypes.IBlog | boolean> {
		try {
			const newBLog: ApiTypes.IBlog = {
				id: (new Date().getMilliseconds()).toString(),
				name,
				youtubeUrl,
				createdAt: new Date().toString()
			}

			let result = await BlogsRepository.createBlog(newBLog);
			return result ? {id: newBLog.id ,name: newBLog.name, youtubeUrl: newBLog.youtubeUrl} : false;
			
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async updateBlog(blog: ApiTypes.IBlog ): Promise<boolean> {
		return BlogsRepository.updateBlog(blog);
	}

	static async deleteBlog(id: string): Promise<boolean> {
		return await BlogsRepository.deleteBlog(id);
	}

	static async deleteAllBlogs(): Promise<boolean>{
		return BlogsRepository.deleteAllBlogs();
	}
}
