import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

/**
 * Verify JWT.
 * 
 * Verify if the JSON Web Token provided and give the decoded token, then call the next middleware function.
 * 
 * @param {Request}      req  the HTTP request
 * @param {Response}     res  the HTTP response
 * @param {NextFunction} next the next middleware function
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers['access-token'];

	if (!token) {
		res.status(401).end();
		return;
	}

	const secret = env().SECRET;

	try {
		const decodedToken = jwt.verify(token.toString(), secret);
		res.locals.user = decodedToken;
	} catch (error) {
		res.status(403).end();
		return;
	}

	next();

};