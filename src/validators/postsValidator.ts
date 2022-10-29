import { body, CustomValidator  } from "express-validator";
import { BlogsService } from '../services/blogs_service';

export const checkBlogID: CustomValidator = async (blogId: string) =>{
	let foundedBlog = await BlogsService.getOneBlog(blogId);
	if(!foundedBlog){
		return Promise.reject();
	}
}

export const createAndUpdatePostsValidator = [
	body("title").isString().trim().isLength({min: 1, max: 30}).withMessage("Укажите заголовок"),
	body("shortDescription").trim().isString().isLength({min: 1, max: 100}).withMessage("Укажите краткое описание"),
	body("content").isString().trim().isLength({min: 1, max: 1000}).withMessage("Напишите пост"),
	body("blogId").isString().trim().custom(checkBlogID).withMessage("Укажите ID блога"),
];