import { body, param } from "express-validator";

export const createAndUpdatePostsValidator = [
	body("title").isString().isLength({min: 1, max: 30}).withMessage("Укажите заголовок"),
	body("shortDescription").isString().isLength({min: 1, max: 100}).withMessage("Укажите краткое описание"),
	body("content").isString().isLength({min: 1, max: 1000}).withMessage("Напишите пост"),
	body("blogId").isString().withMessage("Укажите ID блога"),
];