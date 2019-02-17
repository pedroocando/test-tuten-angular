import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { requestServiceRoutes } from '../booking/requestService.routes';

export const dashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children:[
			...requestServiceRoutes,
		]
	},
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
