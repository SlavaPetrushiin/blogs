import { body, param } from "express-validator";

function checkUrl(url: string){
	let pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
	return pattern.test(url);
}

export const createAndUpdateBlogValidator = [
	body("name").isString().trim().isLength({min: 1, max: 15}).withMessage("Укажите имя"),
	body("youtubeUrl").isString().trim().isLength({max: 100}).custom(checkUrl).withMessage("Укажите валидную ссылку"),
];

