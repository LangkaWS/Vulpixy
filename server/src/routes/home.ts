import express from 'express';
import UserController from '../controllers/user/UserController';

const homeRouter = express.Router();

homeRouter
	.route('/register')
	.post(UserController.register);
	
homeRouter
	.route('/login')
	.post(UserController.login);

homeRouter
	.route('/logout')
	.get(UserController.logout);

export default homeRouter;