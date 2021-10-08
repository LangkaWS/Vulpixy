import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
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
		private authService: AuthService,
		private _formBuilder: FormBuilder,
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
		const user = new User(formData.username, formData.email, formData.password);

		this.authService.register(user).subscribe(() => {
			this._router.navigateByUrl('');
		}, error => {
			this.errorMessage = error.error;
		});
		
	}

}
