import { Application, Request, Response } from 'express';
import home from './home';
import user from './user/user';
import { verifyToken } from '../auth';
import { ApiResponse } from '../api/ApiResponse';

const config = (app: Application): void => {
	app.use('/users', verifyToken, user);
	app.use('/', home);
	app.use('*', (req: Request, res: Response) => {
		res.status(404).send(new ApiResponse(false, null, 'PageNotFound'));
	});
};

export default config;