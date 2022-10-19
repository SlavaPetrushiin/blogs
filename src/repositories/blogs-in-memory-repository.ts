import { ApiTypes } from "../types/types";

class BlogsRepositoryModel {
	private _blogs: ApiTypes.IBlog[];

	constructor() {
		this._blogs = [
			{
				id: "1",
				name: "Country",
				youtubeUrl: "https://www.youtube.com/watch?v=6X_762rJ9J4"
			}
		];
	}

	public async getAllBlogs(): Promise<ApiTypes.IBlog[]> {
		return this._blogs;
	}

	public async getOneBlog(id: string): Promise<ApiTypes.IBlog | null> {
		let foundedBlog = this._blogs.find(blog => blog.id === id);

		if(foundedBlog){
			return foundedBlog;
		}

		return null;
	}

	public async createBlog(params: ApiTypes.ParamsCreateAndUpdateBlog): Promise<ApiTypes.IBlog> {
		let {name, youtubeUrl} = params;
		let newBLog: ApiTypes.IBlog = {
			id: (new Date().getMilliseconds()).toString(),
			name,
			youtubeUrl
		}

		this._blogs.push(newBLog);
		return newBLog;
	}

	public async updateBlog(params: ApiTypes.IBlog ): Promise<boolean> {
		let { id, name, youtubeUrl } = params;
		let foundedBlog = this._blogs.find(blog => blog.id === id);

		if (!foundedBlog) {
			return false;
		}

		foundedBlog.name = name;
		foundedBlog.youtubeUrl = youtubeUrl;
		return true;
	}

	public async deleteBlog(id: string): Promise<boolean> {
		for (let i = 0; i < this._blogs.length; i++) {
			let blog = this._blogs[i];
			if (blog.id === id) {
				this._blogs.splice(i, 1);
				return true;
			}
		}

		return false;
	}

	public async deleteAllBlogs(){
		this._blogs = [];		
	}
}

export const BlogsRepository = new BlogsRepositoryModel();

