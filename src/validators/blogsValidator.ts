import { body, param } from "express-validator";

function checkUrl(url: string){
	let pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
	return pattern.test(url);
}

export const createAndUpdateBlogValidator = [
	body("name").isString().isLength({max: 15}).withMessage("Укажите имя"),
	body("youtubeUrl").isString().isLength({max: 100}).custom(checkUrl).withMessage("Укажите валидную ссылку"),
];

