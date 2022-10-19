import { ApiTypes } from "../types/types";
import { blogsCollection } from "./db";
class BlogsRepositoryModel {
	public async getAllBlogs(): Promise<ApiTypes.IBlog[] | null> {
		try {
			return blogsCollection.find({}).toArray();
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async getOneBlog(id: string): Promise<ApiTypes.IBlog | null> {
		try {
			const foundedBlog = await blogsCollection.findOne({id}, {projection: {_id: false, createdAt: false}});

			if (!foundedBlog) return null
	
			return foundedBlog;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async createBlog(name: string, youtubeUrl: string): Promise<ApiTypes.IBlog | null> {
		try {
			const newBLog: ApiTypes.IBlog = {
				id: (new Date().getMilliseconds()).toString(),
				name,
				youtubeUrl,
				createdAt: new Date().toString()
			}
	
			await blogsCollection.insertOne({...newBLog});
			return newBLog
			
		} catch (error) {
			console.error(error);
			return null;
		}

	}

	public async updateBlog(newBlog: ApiTypes.IBlog ): Promise<boolean> {
		try {
			let {id, name, youtubeUrl} = newBlog;
			let result = await blogsCollection.updateOne({id}, {
				$set: {name,  youtubeUrl}
			});
	
			if (result.matchedCount == 0) {
				return false;
			}	
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deleteBlog(id: string): Promise<boolean> {
		try {
			let result = await blogsCollection.deleteOne({id});
			return result.acknowledged ? true : false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deleteAllBlogs(): Promise<boolean>{
		try {
			let result = await blogsCollection.deleteMany({});
			return result.acknowledged ? true : false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}

export const BlogsRepository = new BlogsRepositoryModel();

