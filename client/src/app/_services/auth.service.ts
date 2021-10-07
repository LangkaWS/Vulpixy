import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	}

  constructor(
		private http: HttpClient
	) { }

	public register(user: User) {
		console.log(environment.apiURL);
		return this.http.post(`${environment.apiURL}/register`, user, this.httpOptions);
	}
}
