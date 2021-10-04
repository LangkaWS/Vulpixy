import { Application } from 'express';
import home from './home';

const config = (app: Application): void => {
	app.use('/', home);
};

export default config;