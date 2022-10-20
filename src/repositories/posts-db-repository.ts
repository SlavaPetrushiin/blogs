import { ApiTypes } from "../types/types";
import { BlogsRepository } from "./blogs-db-repository";
import { db, postsCollection } from "./db";

class PostRepositoryModel {
	public async getAllPosts(): Promise<ApiTypes.IPost[]> {
		return postsCollection.find({}, {projection: {_id: false}}).toArray();
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

			let result = await postsCollection.insertOne(newPost);

			if (result.acknowledged) {
				let post = await postsCollection.findOne({ id: newPost.id }, {projection: {_id: false}});
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
			let foundedPost = await postsCollection.findOne({id}, {projection: {_id: false}});

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
			let foundedPost = await postsCollection.findOne({id});
			let foundedBlog = await BlogsRepository.getOneBlog(blogId);
	
			console.log(foundedPost);
			console.log(foundedBlog);

			if (!foundedBlog || !foundedPost) {
				return null;
			}

			let result = await postsCollection.updateOne({id}, {$set: {title, shortDescription, content}})
			return result.matchedCount > 0 ? true : null;
		} catch (error) {
			console.error(error);
			return null;
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

//Atg-CC6-y2A-B5H