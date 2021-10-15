import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PrivateUserApiService } from 'src/app/_services/api/private-user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	
	registerForm = this._formBuilder.group({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}, { validators: this.checkPassword });

	isSubmitted = false;
	errorMessage = '';

  constructor(
		private _formBuilder: FormBuilder,
		private _privateUserApiService: PrivateUserApiService,
		private _router: Router
	) { }

  ngOnInit(): void {
	}

	get formControls() {
    return this.registerForm.controls;
  }

	private checkPassword(form: AbstractControl): ValidationErrors | null {
		const { password, confirmPassword } = form.value;
		return password === confirmPassword ? null : { notSame: true }
	}

	public onSubmit() {
		this.isSubmitted = true;
		if (this.registerForm.invalid) {
			return;
		}
		const formData = this.registerForm.value;
		const user = { 
			username: formData.username, 
			email: formData.email, 
			password: formData.password
		};

		this._privateUserApiService.register(user).subscribe(() => {
			this._router.navigateByUrl('');
		}, error => {
			this.errorMessage = this.createErrorMessage(error.error.error);
		});
		
	}

	private createErrorMessage(errorMessage: string): string {
		switch(errorMessage) {
			case 'MissingParameter':
				return `Le nom d'utilisateur et le mot de passe sont requis`;
			case 'UsernameAlreadyInUse':
				return `Ce nom d'utilisateur n'est pas disponible`;
			case 'EmailAlreadyInUse':
				return `Cet email est déjà utilisé`;
			default:
				return errorMessage;
		}
	}

}
