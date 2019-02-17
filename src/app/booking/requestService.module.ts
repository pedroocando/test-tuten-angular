import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RequestServiceComponent } from './requestService.component';
import { RequestServiceListComponent } from './requestService-list.component';
import { MatTableModule, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { dashboardRouting } from '../dashboard/dashboard.routes';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		dashboardRouting,
		ReactiveFormsModule,
		MatTableModule,
		MatCheckboxModule,
		MatPaginatorModule,
		MatSortModule,
		MatExpansionModule,
		MatSelectModule
	],
	declarations: [
		RequestServiceComponent,
		RequestServiceListComponent,
	]
})
export class RequestServiceModule { }
