import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
//import { AuthGuardService } from '../core/auth/auth-guard.service';
import { SigninComponent } from './signin/signin.component';
//import { AuthService } from '../core/auth/auth.service';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
//import { UserService } from '../user/user.service';


@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		AccountComponent,
		SigninComponent,
	],
	providers: [
	]
})

export class AccountModule { }
