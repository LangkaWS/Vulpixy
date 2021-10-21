import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FighterInstanceComponent } from './games/fighter-instance/fighter-instance.component';
import { FighterComponent } from './games/fighter/fighter.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UsersComponent } from './user/users/users.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'users/:username', component: UserDetailComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'games/fighter/:id', component: FighterInstanceComponent },
	{ path: 'games/fighter', component: FighterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
