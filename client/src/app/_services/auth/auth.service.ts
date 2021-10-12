import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrivateUserApiService } from '../api/private-user-api.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(
		private _privateUserApiService: PrivateUserApiService,
		private cryptoService: CryptoService,
	) {
		this.isLoggedIn$ = new BehaviorSubject<boolean>(this._isLoggedIn());
	}

	get isLoggedIn() {
		return this.isLoggedIn$;
	}

	private _isLoggedIn() {
		return window.sessionStorage.getItem('isLoggedIn') === 'true';
	}

	public login(username: string, password: string) {
		const response = this._privateUserApiService.login(username, password);

		response.subscribe(() => {
			this.isLoggedIn$.next(true);
			this.setCurrentUser(username).subscribe(user => {
				window.sessionStorage.setItem('user', this.cryptoService.encrypt(user));
			});
			window.sessionStorage.setItem('isLoggedIn', 'true');
		});

		return response;
	}

	public logout() {
		this._privateUserApiService.logout().subscribe(() => {
			window.sessionStorage.clear();
			this.isLoggedIn$.next(false);
		});
	}

	private setCurrentUser(username: string) {
		return this._privateUserApiService.get(username);
	}

}
