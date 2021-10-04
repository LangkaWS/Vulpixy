import express from 'express';
import UserController from '../../controllers/user/UserController';

const userRouter = express.Router();

userRouter
	.route('/all')
	.get(UserController.getAllUsers);

export default userRouter;