import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserApiSerializer } from '../serializer/user-api.serializer';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends ApiService<User> {

  constructor(httpClient: HttpClient, apiSerializer: UserApiSerializer) {
		super(httpClient, apiSerializer, 'users');
	}

}
