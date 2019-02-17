import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	template: `
		<header>
		<img id="logo" src="./assets/images/tuten.png" routerLink="/login"/>
		</header>
		<div class="wrap">
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ['./account.css']
})
export class AccountComponent implements OnInit {

	constructor(
		//private authService: AuthService,
		private router: Router
	) {}

	ngOnInit() {
		/*if (this.authService.getRefreshToken() && this.authService.getAccessToken()) {
			this.router.navigate(['dashboard']);
		}*/
	}
}
