import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth/auth.service';

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
		private router: Router
	) {}

	ngOnInit(): void {
		this.authService.isLoggedIn.subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn
		});
	}

	public logout() {
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigateByUrl('');
	}
}
