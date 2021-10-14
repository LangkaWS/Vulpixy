import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserApiService } from 'src/app/_services/api/user-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	users: Array<User> = [];

  constructor(
		private _userApiService: UserApiService,
	) { }

  ngOnInit(): void {
		this.getUsers();
  }

	private getUsers(): void {
		this._userApiService
			.getAll()
			.subscribe(users => this.users = users);
	}

}
