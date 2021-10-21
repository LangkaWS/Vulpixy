import express from 'express';
import FighterController from '../../controllers/games/fighter/FighterController';

const gameRouter = express.Router();

gameRouter
	.route('/')
	.post(FighterController.createGame);

export default gameRouter;