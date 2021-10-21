import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/_models/game';

@Component({
  selector: 'app-fighter-instance',
  templateUrl: './fighter-instance.component.html',
  styleUrls: ['./fighter-instance.component.scss']
})
export class FighterInstanceComponent implements OnInit {

	gameId: string;

  constructor(
		private route: ActivatedRoute
	) {
		this.gameId = this.getGame();
	}

  ngOnInit(): void {
  }

	private getGame() {
		const gameId = this.route.snapshot.paramMap.get('id');
		return gameId ? gameId : 'no id';
	}

}
