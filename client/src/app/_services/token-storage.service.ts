import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

	private tokenKey = 'auth-token';

  constructor() { }

	public saveToken(token: Object) {
		window.sessionStorage.removeItem(this.tokenKey);
		window.sessionStorage.setItem(this.tokenKey, JSON.stringify(token));
	}
}
