import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrivateUserApiService } from '../api/private-user-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(
		private _privateUserApiService: PrivateUserApiService
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
			window.sessionStorage.setItem('isLoggedIn', 'true');
			this.isLoggedIn$.next(true);
		});

		return response;
	}

	public logout() {
		this._privateUserApiService.logout().subscribe(() => {
			window.sessionStorage.clear();
			this.isLoggedIn$.next(false);
		});
	}
}
