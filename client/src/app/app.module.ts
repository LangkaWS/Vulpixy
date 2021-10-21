import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './user/users/users.component';
import { CustomHttpInterceptor } from './_interceptors/custom-http.interceptor';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './_services/error/global-error-handler';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomeComponent } from './home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ErrorDialogComponent,
    UserDetailComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatButtonModule
  ],
  providers: [
		{
			provide: LOCALE_ID,
			useValue: 'fr-FR'
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CustomHttpInterceptor,
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
