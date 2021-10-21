import { customAlphabet } from 'nanoid';

export default class Fighter {
	private static alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	private static nanoid = customAlphabet(Fighter.alphabet, 6);
	private static currentIds: Array<string> = [];
	private static currentGames: Array<Fighter> = [];

	public id: string;
	public player1: string;
	public player2: string;
	public winner: string;

	constructor(username: string) {
		const id = Fighter.getRandomId();
		this.id = id;
		Fighter.currentIds.push(id);

		this.player1 = username;
		this.player2 = '';
		this.winner = '';
		Fighter.currentGames.push(this);
	}

	private static getRandomId = () => {
		let id = Fighter.nanoid();
		while (Fighter.currentIds.includes(id)) {
			id = Fighter.nanoid();
		}
		return id;
	}
}