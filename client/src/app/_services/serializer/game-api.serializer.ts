import { Injectable } from "@angular/core";
import { Game } from "src/app/_models/game";
import { BaseApiSerializer } from "./base-api.serializer";

@Injectable({
  providedIn: 'root'
})
export class GameApiSerializer extends BaseApiSerializer<Game> {

	constructor() {
		super();
	}

	public fromJson(object: any): Game {
		return {
			id: object.id,
			player1: object.player1,
			player2: object.player2,
			winner: object.winner
		} as Game;
	}

	public toJson(object: Game): any {
		return {
			id: object.id,
			player1: object.player1,
			player2: object.player2,
			winner: object.winner
		}
	}


}