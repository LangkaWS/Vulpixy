import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserApiService } from 'src/app/_services/api/user-api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

	user?: User;

  constructor(
		private _route: ActivatedRoute,
		private _userApiService: UserApiService
	) { }

  ngOnInit(): void {
		this._getUser();
  }

	private _getUser() {
		const username = this._route.snapshot.paramMap.get('username');
		if (username) {
			this._userApiService.get(username).subscribe(user => this.user = user);
		}
	}

}
