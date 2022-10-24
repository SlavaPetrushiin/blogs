import { ApiTypes } from "../types/types";
import { blogsCollection } from "./db";
class BlogsRepositoryModel {
	public async getAllBlogs(): Promise<ApiTypes.IBlog[] | null> {
		try {
			return blogsCollection.find({}, {projection: {_id: false}}).toArray();
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async getOneBlog(id: string): Promise<ApiTypes.IBlog | null> {
		try {
			const foundedBlog = await blogsCollection.findOne({id}, {projection: {_id: false}});

			if (!foundedBlog) return null
	
			return foundedBlog;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async createBlog(blog: ApiTypes.IBlog ): Promise<boolean> {
		try {
			let result = await blogsCollection.insertOne(blog);
			return result.acknowledged;			
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async updateBlog(blog: ApiTypes.IBlog ): Promise<boolean> {
		try {
			let {id, name, youtubeUrl} = blog;
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
			let res = await blogsCollection.deleteOne({id});
			return res.deletedCount > 0 ? true : false;
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

