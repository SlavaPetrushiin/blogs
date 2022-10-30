import { Request, Response, NextFunction, } from "express";
import { validationResult } from "express-validator";

export const checkError = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		let errors = result.array({ onlyFirstError: true }).map(er => ({field: er.param, message: er.msg}));
		return res.status(400).json({ errorsMessages: errors });
	}
	next();
}

export const checkErrorТNotFound = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(404);
	}
	next();
}