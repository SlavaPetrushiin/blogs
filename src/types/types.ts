export namespace ApiTypes {
	export interface IBlog {
		id: string;
		name: string;
		youtubeUrl: string;
	}

	export interface IPost {
		id: string;
		title: string;
		shortDescription: string;
		content: string;
		blogId: string;
		blogName: string;
	}

	export interface IFieldError{
		message: string;
		field: string;
	}

	export type ParamsCreateAndUpdateBlog =  Required<Omit<ApiTypes.IBlog, 'id'>>
}