import express from 'express';
import UserController from '../../controllers/user/UserController';

const userRouter = express.Router();

userRouter
	.route('/')
	.get(UserController.getAllUsers);

userRouter
	.route('/:username')
	.get(UserController.getUser);

userRouter
	.route('/private/:username')
	.get(UserController.getPrivateUser)
	.put(UserController.updateUser)
	.delete(UserController.deleteUser);

export default userRouter;