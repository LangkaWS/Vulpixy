import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { PrivateUser } from 'src/app/_models/private-user';
import { FighterApiService } from 'src/app/_services/api/fighter-api.service';
import { CryptoService } from 'src/app/_services/crypto/crypto.service';

@Component({
  selector: 'app-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class FighterComponent implements OnInit {

	user: PrivateUser;

  constructor(
		private cryptoService: CryptoService,
		private socket:Socket,
		private fighterApiService: FighterApiService,
		private router: Router
	) {
		this.user = this.getCurrentUser();
	}

  ngOnInit(): void {
  }

	public newGame() {
		const game = {
			player1: this.user.username
		}
		this.fighterApiService.add(game).subscribe((data) => {
			this.router.navigateByUrl(`/games/fighter/${data.id}`);
		})
	}

	public joinGame() {

	}

	private getCurrentUser() {
		const userString = window.sessionStorage.getItem('user');
		return userString ? this.cryptoService.decrypt(userString) : null;
	}

}
