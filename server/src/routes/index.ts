import { Application } from 'express';
import home from './home';
import user from './user/user';
import { verifyToken } from '../auth';

const config = (app: Application): void => {
	app.use('/user', verifyToken, user);
	app.use('/', home);
};

export default config;