import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Vulpixy';
	isLoggedIn = false;

	constructor(
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.authService.isLoggedIn.subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn
		});
	}
}
