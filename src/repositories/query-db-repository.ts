import { blogsCollection, postsCollection } from "./db";

interface IReqAllBlogs {
	searchNameTerm: string;
	pageNumber: number;
	pageSize: number;
	sortBy: string;
	sortDirection: string;
}

interface IReqAllPosts {
	pageNumber: number;
	pageSize: number;
	sortBy: string;
	sortDirection: string;
}

export class QueryRepository {
	static async getAllBlogs(params: IReqAllBlogs) {
		try {
			let { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = params;
			let skip = (pageNumber - 1) * pageSize;

			return blogsCollection.find(
				{ name: { $regex: searchNameTerm, $options: "$i" } },
				{ projection: { _id: false } }
			)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.skip(+skip)
				.limit(+pageSize)
				.toArray();

		} catch (error) {
			console.log("FUKKKKK: ", error);
		}
	}

	static async getAllPostsInBlog(blogId: string, queries: IReqAllPosts){
		try {
			let { pageNumber, pageSize, sortBy, sortDirection } = queries;
			let skip = (pageNumber - 1) * pageSize;
			console.log(blogId);
			return postsCollection.find(
				{blogId},
				{ projection: { _id: false } }
			)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.skip(+skip)
				.limit(+pageSize)
				.toArray();

		} catch (error) {
			console.log("FUKKKKK: ", error);
		}
	}

	static async getAllPosts(params: IReqAllPosts) {
		try {
			let { pageNumber, pageSize, sortBy, sortDirection } = params;
			let skip = (pageNumber - 1) * pageSize;

			return postsCollection.find(
				{ projection: { _id: false } }
			)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.skip(+skip)
				.limit(+pageSize)
				.toArray();

		} catch (error) {
			console.log("FUKKKKK: ", error);
		}

	}
}