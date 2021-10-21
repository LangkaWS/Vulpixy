import { Request, Response } from 'express';
import { ApiResponse } from '../../../api/ApiResponse';
import Fighter from '../../../database/models/fighter/Fighter';

export default class FighterController {

	static createGame = (req: Request, res: Response): void => {
		const { username } = res.locals.user;
		const game = new Fighter(username);
		res.status(201).send(new ApiResponse(true, game, null));
		return;
	}

}