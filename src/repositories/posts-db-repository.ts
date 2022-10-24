import { IUpdatePostParams } from "../services/posts_service";
import { ApiTypes } from "../types/types";
import { BlogsRepository } from "./blogs-db-repository";
import { db, postsCollection } from "./db";

const defaultProjection =  {_id: false};
class PostRepositoryModel {
	public async getAllPosts(): Promise<ApiTypes.IPost[]> {
		return postsCollection.find({}, {projection: {...defaultProjection}}).toArray();
	}

	public async createPost(post: ApiTypes.IPost): Promise<ApiTypes.IPost | boolean> {
		try {
			let result = await postsCollection.insertOne(post);
			return result.acknowledged;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async getOnePost(id: string): Promise<ApiTypes.IPost | boolean> {
		try {
			let foundedPost = await postsCollection.findOne({id}, {projection:{...defaultProjection}});

			if (!foundedPost) {
				return false;
			}

			return foundedPost;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async updatePost(params: IUpdatePostParams): Promise<boolean> {
		try {
			let { title, shortDescription, content, id } = params;
			let result = await postsCollection.updateOne({id}, {$set: {title, shortDescription, content}});
			return result.matchedCount > 0 ? true : false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deletePost(id: string): Promise<boolean> {
		try {
			let result = await postsCollection.deleteOne({id});
			return result.deletedCount > 0 ? true : false;
		} catch (error) {
			return false;
		}
	}

	public async removeAllPostsDeletedBlog(blogId: string): Promise<void> {
		await postsCollection.deleteMany({blogId})
	}

	public async deleteAllBPosts(): Promise<void> {
		await postsCollection.deleteMany({})
	}
}

export const PostsRepository = new PostRepositoryModel();
