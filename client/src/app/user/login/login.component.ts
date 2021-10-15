import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm = this.formBuilder.group({
		username: '',
		password: ''
	});
	isLoginFailed = false;
	isLoggedIn = false;
	errorMessage = '';
	isSubmitted = false;

  constructor(
		private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
	) { }

  ngOnInit(): void {
		this.authService.isLoggedIn.subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn;
		})
  }

	get formControls() {
    return this.loginForm.controls;
  }

	onSubmit() {
		this.isSubmitted = true;
		if (this.loginForm.invalid) {
      return;
    }
		const { username, password } = this.loginForm.value;
		this.authService.login(username, password).subscribe(() => {
      this.isLoginFailed = false;
      this.router.navigateByUrl('');
    }, error => {
      this.errorMessage = this.createErrorMessage(error.error.error);
      this.isLoginFailed = true;
    });
	}

	private createErrorMessage(errorMessage: string): string {
		switch(errorMessage) {
			case 'InvalidCredentials':
				return `Le nom d'utilisateur ou le mot de passe est incorrect`;
			case 'MissingParameter':
				return `Le nom d'utilisateur et le mot de passe sont requis`;
			default:
				return errorMessage;
		}
	}

}
