// import { ApiTypes } from "../types/types";
// import { BlogsRepository } from "./blogs-in-memory-repository";

// class PostRepositoryModel {
// 	private _posts: ApiTypes.IPost[];

// 	constructor() {
// 		this._posts = [
// 			{
// 				id: "1",
// 				title: "I love node",
// 				shortDescription: "I love node js, express",
// 				content: "В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов",
// 				blogId: "1", 
// 				blogName: "Country"
// 			}
// 		];
// 	}

// 	public async getAllPosts(): Promise<ApiTypes.IPost[]> {
// 		return this._posts;
// 	}

// 	public async createPost(params:  ApiTypes.ParamsCreatePost): Promise<ApiTypes.IPost | null> {
// 		let {blogId, content, shortDescription, title} = params;
// 		let foundedBlog = await BlogsRepository.getOneBlog(blogId);

// 		if(!foundedBlog){
// 			return null;
// 		}

// 		let newPost: ApiTypes.IPost = {
// 			id: (new Date().getMilliseconds()).toString(),
// 			title,
// 			shortDescription, 
// 			content, 
// 			blogId, 
// 			blogName: foundedBlog.name
// 		}

// 		this._posts.push(newPost);
// 		return newPost;
// 	}

// 	public async getOnePost(id: string): Promise<ApiTypes.IPost | null> {
// 		let foundedPost = this._posts.find(post => post.id === id);

// 		if(!foundedPost){
// 			return null;
// 		}

// 		return foundedPost;
// 	}

// 	public async updatePost(params: ApiTypes.ParamsUpdatePost,): Promise<boolean | null> {
// 		let {title, shortDescription, content, blogId, id  } = params;
// 		let foundedPost = this._posts.find(post => post.id === id);
// 		let foundedBlog = BlogsRepository.getOneBlog(blogId);

// 		if (!foundedBlog || !foundedPost) {
// 			return null;
// 		}

// 		foundedPost.title = title;
// 		foundedPost.shortDescription = shortDescription;
// 		foundedPost.content = content;
// 		foundedPost.title = title;
// 		return true;
// 	}

// 	public async deletePost(id: string): Promise<boolean> {
// 		for (let i = 0; i < this._posts.length; i++) {
// 			let blog = this._posts[i];
// 			if (blog.id === id) {
// 				this._posts.splice(i, 1);
// 				return true;
// 			}
// 		}

// 		return false;
// 	}

// 	public async removeAllPostsDeletedBlog(blogId: string): Promise<void>{
// 		this._posts = this._posts.filter(post => post.blogId != blogId);
// 	}

// 	public async deleteAllBPosts(): Promise<void> {
// 		this._posts = [];		
// 	}
// }

// export const PostsRepository = new PostRepositoryModel();

