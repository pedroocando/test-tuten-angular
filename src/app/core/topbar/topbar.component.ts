import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { Router } from '@angular/router';

@Component({
	selector: 'topbar',
	template: `
		<div class="top-bar">
			<span *ngIf="user" i18n="@@welcome">Welcome: <b class="clickable-item" routerLink="/dashboard/users">{{user}}</b></span>
			<a style="margin-left: 10px;" (click)="logout()" i18n="@@logout">Logout</a>
		</div>
	`,
	styleUrls: ['./topbar.component.css'],
})

export class TopbarComponent implements OnInit {
	sesion: any;
	user: any;

	constructor(
		private router: Router,
		private notificationService: NotificationService,
	) {}

	ngOnInit() {
		this.sesion = JSON.parse(localStorage.getItem('currentUser')) != null ? true : false;
		if (this.sesion) {
      		this.user = JSON.parse(localStorage.getItem('currentUser')).email.toUpperCase();
		} else {
			this.notificationService.customError('You have not logged in, try to login');
			this.router.navigateByUrl('/');
			localStorage.clear();
			sessionStorage.clear();
		}
	}

	public logout() {
		this.notificationService.genericsuccess('Has left the system', 'Have a good day!');
		this.router.navigate(['/']);
		localStorage.clear();
		sessionStorage.clear();
	}
}
