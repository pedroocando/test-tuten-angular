import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './account.component';

export const accountRoutes: Routes = [
	{
		path: '',
		component: AccountComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: SigninComponent
			},
			{
				path: 'login',
				redirectTo: ''
			}
		]
	}
];
