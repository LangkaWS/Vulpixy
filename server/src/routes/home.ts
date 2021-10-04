import express from 'express';
import UserController from '../controllers/user/UserController';

const homeRouter = express.Router();

homeRouter
	.route('/register')
	.post(UserController.register);
	
export default homeRouter;