import { checkAuth } from './../utils/checkAuth';
import { ApiTypes } from "../types/types";
import { db } from "./db";

class BlogsRepositoryModel {
	public async getAllBlogs(): Promise<ApiTypes.IBlog[] | null> {
		try {
			return db.collection<ApiTypes.IBlog>("blogs").find({}).toArray();
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async getOneBlog(id: string): Promise<ApiTypes.IBlog | null> {
		try {
			let foundedBlog = await db.collection<ApiTypes.IBlog>("blogs").findOne({id});

			if(foundedBlog){
				return foundedBlog;
			}
	
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async createBlog(params: ApiTypes.ParamsCreateAndUpdateBlog): Promise<ApiTypes.IBlog | null> {
		try {
			let {name, youtubeUrl} = params;
			let newBLog: ApiTypes.IBlog = {
				id: (new Date().getMilliseconds()).toString(),
				name,
				youtubeUrl,
				createdAt: new Date().toString()
			}
	
			let result = await db.collection<ApiTypes.IBlog>("blogs").insertOne(newBLog);

			if(result.acknowledged){
				let newBlog = this.getOneBlog(newBLog.id);
				return !!newBlog ? newBlog : null;
			}

			return null;
		} catch (error) {
			console.error(error);
			return null;
		}

	}

	public async updateBlog(newBlog: ApiTypes.IBlog ): Promise<boolean> {
		try {
			let {id, name, youtubeUrl} = newBlog;
			let result = await db.collection<ApiTypes.IBlog>("blogs").updateOne({id}, {
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
			let result = await db.collection<ApiTypes.IBlog>("blogs").deleteOne({id});
			return result.acknowledged ? true : false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deleteAllBlogs(): Promise<boolean>{
		try {
			let result = await db.collection<ApiTypes.IBlog>("blogs").deleteMany({});
			return result.acknowledged ? true : false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}

export const BlogsRepository = new BlogsRepositoryModel();

