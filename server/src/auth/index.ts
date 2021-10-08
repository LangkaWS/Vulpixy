import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import UserRepository from '../database/repository/user/UserRepository';

/**
 * Verify JWT.
 * 
 * Verify if the JSON Web Token provided and give the decoded token, then call the next middleware function.
 * 
 * @param {Request}      req  the HTTP request
 * @param {Response}     res  the HTTP response
 * @param {NextFunction} next the next middleware function
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

	const session = req.session;

	if (!session || !session.authToken) {
		res.status(401).end();
		return;
	}

	const secret = env().SECRET;

	try {
		const decodedToken = jwt.verify(session.authToken.toString(), secret);
		res.locals.user = decodedToken;
	} catch (error) {
		res.status(403).end();
		return;
	}

	next();

};