import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { accountRoutes } from './account/account.routes';
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  {
		path: '',
		component: AppComponent,
		children: [
			...accountRoutes,
			...dashboardRoutes,
		]
	}, {
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
