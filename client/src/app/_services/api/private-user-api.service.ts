import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PrivateUser } from 'src/app/_models/private-user';
import { environment } from 'src/environments/environment';
import { PrivateUserApiSerializer } from '../serializer/private-user-api.serializer';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateUserApiService extends ApiService<PrivateUser> {

  constructor(httpClient: HttpClient, apiSerializer: PrivateUserApiSerializer) {
		super(httpClient, apiSerializer, 'users');
	}

	public register(user: PrivateUser) {
		return this._httpClient
			.post(`${environment.apiURL}/register`, this._apiSerializer.toJson(user));
	}

	public login(username: string, password: string) {
		return this._httpClient
			.post(`${environment.apiURL}/login`, { username, password });
	}

	public logout() {
		return this._httpClient
			.get(`${environment.apiURL}/logout`);
	}
}
