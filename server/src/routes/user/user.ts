import express from 'express';
import UserController from '../../controllers/user/UserController';

const userRouter = express.Router();

userRouter
	.route('/all')
	.get(UserController.getAllUsers);

userRouter
	.route('/:username')
	.get(UserController.getUser)
	.put(UserController.updateUser)
	.delete(UserController.deleteUser);

userRouter
	.route('/:username/private')
	.get(UserController.getPrivateUser);

export default userRouter;