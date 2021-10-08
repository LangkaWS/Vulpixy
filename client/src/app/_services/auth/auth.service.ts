import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { BehaviorSubject } from 'rxjs';
import { PrivateUserApiService } from '../api/private-user-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(
		private _tokenStorageService: TokenStorageService,
		private _privateUserApiService: PrivateUserApiService
	) {
		this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
	}

	get isLoggedIn() {
		return this.isLoggedIn$;
	}

	public login(username: string, password: string) {
		const response = this._privateUserApiService.login(username, password);

		response.subscribe(data => {
			this._tokenStorageService.saveToken(data);
			this.isLoggedIn$.next(true);
		});

		return response;
	}

	public logout() {
		this._tokenStorageService.logout();
		this.isLoggedIn$.next(false);
	}
}
