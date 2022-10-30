import { BlogsRepository } from './blogs-db-repository';
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

			let result = await blogsCollection.find(
				{ name: { $regex: searchNameTerm, $options: "$i" } },
				{ projection: { _id: false } }
			)
				.skip(+skip)
				.limit(+pageSize)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.toArray();

			let totalCount = await blogsCollection.countDocuments({ name: { $regex: searchNameTerm, $options: "$i" } });
			let pageCount = Math.ceil(totalCount / pageSize);

			return {
				pagesCount: pageCount,
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: result
			}

		} catch (error) {
			console.log("Error: ", error);
		}
	}

	static async getAllPostsInBlog(blogId: string, queries: IReqAllPosts) {
		try {
			let { pageNumber, pageSize, sortBy, sortDirection } = queries;
			let skip = (pageNumber - 1) * pageSize;

			let result = await postsCollection.find(
				{ blogId },
				{ projection: { _id: false } }
			)
				.skip(+skip)
				.limit(+pageSize)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.toArray();

			let totalCount = await postsCollection.countDocuments({ blogId });
			let pageCount = Math.ceil(totalCount / pageSize);

			return {
				pagesCount: pageCount,
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: result
			}
		} catch (error) {
			console.log("Error: ", error);
		}
	}

	static async getAllPosts(params: IReqAllPosts) {
		try {
			let { pageNumber, pageSize, sortBy, sortDirection } = params;
			let skip = (pageNumber - 1) * pageSize;

			let result = postsCollection.find(
				{ projection: { _id: false } }
			)
				.skip(+skip)
				.limit(+pageSize)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.toArray();

			let totalCount = await postsCollection.countDocuments();
			let pageCount = Math.ceil(totalCount / pageSize);

			return {
				pagesCount: pageCount,
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: result
			}
		} catch (error) {
			console.log("Error: ", error);
		}

	}
}