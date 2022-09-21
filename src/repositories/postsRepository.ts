import { ApiTypes } from "../types/types";

class PostRepositoryModel {
	private _posts: ApiTypes.IPost[];

	constructor() {
		this._posts = [];
	}

	// public getAllBlogs(): ApiTypes.IBlog[] {
	// 	return this._blogs;
	// }

	// public createBlog(name: string, youtubeUrl: string): ApiTypes.IBlog {
	// 	let newBLog: ApiTypes.IBlog = {
	// 		id: (new Date().getMilliseconds()).toString(),
	// 		name,
	// 		youtubeUrl
	// 	}

	// 	this._blogs.push(newBLog);
	// 	return newBLog;
	// }

	// public updateBlog(params: ApiTypes.IBlog) {
	// 	let { id, name, youtubeUrl } = params;
	// 	let foundedBlog = this._blogs.find(blog => blog.id === id);

	// 	if (!foundedBlog) {
	// 		return false;
	// 	}

	// 	foundedBlog.name = name;
	// 	foundedBlog.youtubeUrl = youtubeUrl;
	// 	return true;
	// }

	// public deleteBlog(id: string): boolean {
	// 	for (let i = 0; i < this._blogs.length; i++) {
	// 		let blog = this._blogs[i];
	// 		if (blog.id === id) {
	// 			this._blogs.splice(i, 1);
	// 			return true;
	// 		}
	// 	}

	// 	return false;
	// }
}

export const PostsRepository = new PostRepositoryModel();

