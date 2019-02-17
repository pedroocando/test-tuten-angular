import { Routes } from '@angular/router';
import { RequestServiceComponent } from './requestService.component';
import { RequestServiceListComponent } from './requestService-list.component';

export const requestServiceRoutes: Routes = [
	{
		path: 'booking',
		component: RequestServiceComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: RequestServiceListComponent
			}
		]
	}
];
