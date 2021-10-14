import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrivateUser } from 'src/app/_models/private-user';
import { PrivateUserApiService } from 'src/app/_services/api/private-user-api.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { CryptoService } from 'src/app/_services/crypto/crypto.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

	user: PrivateUser;

	profileForm: FormGroup;

	displayForm = false;
	submitted = false;
	errorMessage = '';

  constructor(
		private cryptoService: CryptoService,
		private formBuilder: FormBuilder,
		private privateUserApiService: PrivateUserApiService,
		private authService: AuthService
	) {
		this.user = this.getCurrentUser();
		this.profileForm = this.formBuilder.group({
			username: this.user?.username,
			email: this.user?.email,
			password: ''
		});
	}

  ngOnInit(): void {

  }

	get formControls() {
    return this.profileForm.controls;
  }

	private getCurrentUser() {
		const userString = window.sessionStorage.getItem('user');
		return userString ? this.cryptoService.decrypt(userString) : null;
	}

	public edit() {
		this.displayForm = true;
	}

	public onSubmit() {
		this.submitted = true;
		if (this.profileForm.invalid) {
			return;
		}
		const formData = this.profileForm.value;
		const user = {
			username: formData.username,
			email: formData.email,
			password: formData.password
		};

		this.privateUserApiService.update(this.user.username, user).subscribe(() => {
			this.user.username = user.username;
			this.user.email = user.email;
			this.authService.updateCurrentUser(this.user);
			this.displayForm = false;
		}, error => {
			this.errorMessage = error.error
		})

	}

}
