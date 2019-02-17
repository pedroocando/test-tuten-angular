import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }  from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationComponent } from './notification/notification.component';
import { ValidatorComponent } from './form/validator.component';
//import { MatCheckboxModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		SimpleNotificationsModule.forRoot(),
	],
	declarations: [
		NotificationComponent,
		ValidatorComponent
	],
	exports: [
		NotificationComponent,
		ValidatorComponent,
	]
})
export class SharedModule { }
