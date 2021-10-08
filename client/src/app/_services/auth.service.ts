import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import { TokenStorageService } from './token-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	}
	private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(
		private http: HttpClient,
		private tokenStorageService: TokenStorageService
	) {
		this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
	}

	get isLoggedIn() {
		return this.isLoggedIn$;
	}

	public login(username: string, password: string) {
		const response = this.http.post(`${environment.apiURL}/login`, 
			{ username, password }, 
			this.httpOptions);

		response.subscribe(data => {
			this.tokenStorageService.saveToken(data);
			this.isLoggedIn$.next(true);
		});

		return response;
	}

	public logout() {
		this.tokenStorageService.logout();
		this.isLoggedIn$.next(false);
	}
}
