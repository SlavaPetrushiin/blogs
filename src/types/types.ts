export namespace ApiTypes {
	export interface IBlog {
		id: string;
		name: string;
		youtubeUrl: string;
		createdAt: string;
	}

	export interface IPost {
		id: string;
		title: string;
		shortDescription: string;
		content: string;
		blogId: string;
		blogName: string;
		createdAt: string;
	}

	export interface IFieldError{
		message: string;
		field: string;
	}

	export type ParamsCreateAndUpdateBlog =  Omit<ApiTypes.IBlog, 'id'>
	export type ParamsCreatePost =  Omit<ApiTypes.IPost, 'id' | 'blogName'>
	export type ParamsUpdatePost =  Omit<ApiTypes.IPost, 'blogName'>

	export interface ICreateAndUpdateBlogParams {
		title: string;
		shortDescription: string;
		content: string;
		blogId: string;
	}

	export interface IBlogPost{
		title: string;
		shortDescription: string;
		content: string;
	}
}