import { Application } from 'express';
import home from './home';
import user from './user/user';

const config = (app: Application): void => {
	app.use('/user', user);
	app.use('/', home);
};

export default config;