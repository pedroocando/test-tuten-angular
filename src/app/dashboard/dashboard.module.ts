import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { dashboardRouting } from './dashboard.routes';
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { TopbarComponent } from '../core/topbar/topbar.component';
import { RequestServiceModule } from '../booking/requestService.module';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		dashboardRouting,
		RequestServiceModule,
	],
	declarations: [
		TopbarComponent,
		DashboardComponent,
		SidebarComponent
	]
})
export class DashboardModule { }
