import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
import { UserDetailComponent } from './user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ErrorDialogComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDialogModule
  ],
  providers: [
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
