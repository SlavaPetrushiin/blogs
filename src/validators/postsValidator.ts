import { BlogsRepository } from './../repositories/blogsRepository';
import { body } from "express-validator";

function checkBlogID(blogId: string){
	let foundedBlog = BlogsRepository.getOneBlog(blogId);
	if(!foundedBlog){
		return false;
	}
	return true;
}

export const createAndUpdatePostsValidator = [
	body("title").isString().isLength({min: 1, max: 30}).withMessage("Укажите заголовок"),
	body("shortDescription").isString().isLength({min: 1, max: 100}).withMessage("Укажите краткое описание"),
	body("content").isString().isLength({min: 1, max: 1000}).withMessage("Напишите пост"),
	body("blogId").isString().trim().custom(checkBlogID).withMessage("Укажите ID блога"),
];