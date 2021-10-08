import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

	private tokenKey = 'auth-token';

  constructor() { }

	public saveToken(token: string) {
		window.sessionStorage.removeItem(this.tokenKey);
		window.sessionStorage.setItem(this.tokenKey, token);
	}

	public getToken() {
		return window.sessionStorage.getItem(this.tokenKey);
	}

	public logout() {
		window.sessionStorage.clear();
	}
}
