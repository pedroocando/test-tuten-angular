import { Component, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NotificationService } from './notification.service';

@Component({
	selector: 'notification',
	template: `
		<!--<simple-notifications
			[options]="options"
			(onCreate)="onCreate($event)"
			(onDestroy)="onDestroy($event)">
		</simple-notifications>-->

		<simple-notifications [options]="options"></simple-notifications>

		<ng-template #success i18n="@@noti-successful">
			<h1>Successful!</h1>
			<p>Successful operation!</p>
		</ng-template>

		<ng-template #error i18n="@@noti-error">
			<h1>Error!</h1>
			<p>Error in the system, check with the administrator</p>
		</ng-template>

		<ng-template #error400 i18n="@@noti-error400">
			<h1>Bad Request</h1>
			<p>Invalid data</p>
		</ng-template>

		<ng-template #error401 i18n="@@noti-error401">
			<h1>Unauthorized</h1>
			<p>Invalid credentials</p>
		</ng-template>

		<ng-template #error404 i18n="@@noti-error404">
			<h1>Not Found</h1>
			<p>Resource not found</p>
		</ng-template>

		<ng-template #error409 i18n="@@noti-error409">
			<h1>Conflict</h1>
			<p>Check the dependencies</p>
		</ng-template>

		<ng-template #duplicated i18n="@@noti-duplicated">
			<h1>Duplicated</h1>
			<p>Resource or data duplicated</p>
		</ng-template>
	`
})
export class NotificationComponent implements AfterViewInit {
	@ViewChild('success') success: TemplateRef<any>;
	@ViewChild('error') error: TemplateRef<any>;
	@ViewChild('error400') error400: TemplateRef<any>;
	@ViewChild('error401') error401: TemplateRef<any>;
	@ViewChild('error404') error404: TemplateRef<any>;
	@ViewChild('error409') error409: TemplateRef<any>;
	@ViewChild('duplicate') duplicate: TemplateRef<any>;

	public options = {
		position: ['bottom', 'left'],
		timeOut: 2000,
		showProgressBar: true,
		pauseOnHover: true,
		clickToClose: true,
		preventDuplicates: true
	};

	constructor(
		private service: NotificationsService,
		private notificationService: NotificationService
	) {}

	ngAfterViewInit() {
		this.notificationService.nsuccess = this.success;
		this.notificationService.nerror = this.error;
		this.notificationService.nerror400 = this.error400;
		this.notificationService.nerror400 = this.error400;
		this.notificationService.nerror404 = this.error404;
		this.notificationService.nerror409 = this.error409;
		this.notificationService.nduplicate = this.duplicate;
	}

}
