import { ApiTypes } from "../types/types";
import { BlogsRepository } from "./blogs-db-repository";
import { db } from "./db";

class PostRepositoryModel {
	public async getAllPosts(): Promise<ApiTypes.IPost[]> {
		return db.collection<ApiTypes.IPost>("posts").find({}).toArray();
	}

	public async createPost(params: ApiTypes.ParamsCreatePost): Promise<ApiTypes.IPost | null> {
		try {
			let { blogId, content, shortDescription, title } = params;
			let foundedBlog = await BlogsRepository.getOneBlog(blogId);

			if (!foundedBlog) {
				return null;
			}

			let newPost: ApiTypes.IPost = {
				id: (new Date().getMilliseconds()).toString(),
				title,
				shortDescription,
				content,
				blogId,
				blogName: foundedBlog.name
			}

			let result = await db.collection<ApiTypes.IPost>("posts").insertOne(newPost);

			if (result.acknowledged) {
				let post = await db.collection<ApiTypes.IPost>("posts").findOne({ id: newPost.id });
				return !!post ? post : null;
			}

			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async getOnePost(id: string): Promise<ApiTypes.IPost | null> {
		try {
			let foundedPost = await db.collection<ApiTypes.IPost>("posts").findOne({id});

			if (!foundedPost) {
				return null;
			}

			return foundedPost;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async updatePost(params: ApiTypes.ParamsUpdatePost,): Promise<boolean | null> {
		try {
			let { title, shortDescription, content, blogId, id } = params;
			let foundedPost = await db.collection<ApiTypes.IPost>("posts").findOne({id});
			let foundedBlog = await BlogsRepository.getOneBlog(blogId);
	
			if (!foundedBlog || !foundedPost) {
				return null;
			}

			let result = await db.collection<ApiTypes.IPost>("posts").updateOne({id}, {
				title, shortDescription, content
			})
			return result.matchedCount > 0 ? true : null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async deletePost(id: string): Promise<boolean> {
		try {
			let result = await db.collection<ApiTypes.IPost>("posts").deleteOne({id});
			return result.acknowledged;
		} catch (error) {
			return false;
		}
	}

	public async removeAllPostsDeletedBlog(blogId: string): Promise<void> {
		await db.collection<ApiTypes.IPost>("posts").deleteMany({blogId})
	}

	public async deleteAllBPosts(): Promise<void> {
		await db.collection<ApiTypes.IPost>("posts").deleteMany({})
	}
}

export const PostsRepository = new PostRepositoryModel();

//Atg-CC6-y2A-B5H