import express from 'express';
import UserController from '../../controllers/user/UserController';

const userRouter = express.Router();

userRouter
	.route('/')
	.get(UserController.getAllUsers);

userRouter
	.route('/:username')
	.get(UserController.getUser)
	.put(UserController.updateUser)
	.delete(UserController.deleteUser);

userRouter
	.route('/private/:username')
	.get(UserController.getPrivateUser);

export default userRouter;