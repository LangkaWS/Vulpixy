import { Component, OnInit } from '@angular/core';
import { PrivateUser } from 'src/app/_models/private-user';
import { CryptoService } from 'src/app/_services/crypto/crypto.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

	user?: PrivateUser;

  constructor(
		private cryptoService: CryptoService,
	) { }

  ngOnInit(): void {
		this.user = this.getCurrentUser()
  }

	private getCurrentUser() {
		const userString = window.sessionStorage.getItem('user');
		return userString ? this.cryptoService.decrypt(userString) : null;
	}

}
