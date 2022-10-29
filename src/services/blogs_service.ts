import { PostsRepository } from './../repositories/posts-db-repository';
import { BlogsRepository } from './../repositories/blogs-db-repository';
import { ApiTypes } from "../types/types";

export class BlogsService {
	static async getAllBlogs(searchNameTerm:string, sortBy: string): Promise<ApiTypes.IBlog[] | null> {
		return await BlogsRepository.getAllBlogs(searchNameTerm, sortBy);
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
				createdAt: new Date().toISOString()
			}

			let result = await BlogsRepository.createBlog({...newBLog});
			return result ? newBLog : false;
			
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

	static async getAllPostsBlog(id: string): Promise<ApiTypes.IPost[] | null> {
		try {
			let foundedBlog = await BlogsRepository.getOneBlog(id);
			if(!foundedBlog){
				return null;
			}
	
			return await PostsRepository.getAllPostsBlog(foundedBlog.id);
			
		} catch (error) {
			return null
		}

	}
}
