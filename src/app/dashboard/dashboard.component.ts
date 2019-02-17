import { Component } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	template: `
		<div class="grid-h">
			<div class="nav">
				<sidebar></sidebar>
			</div>
			<div class="content grid-v">
				<section class="header">
					<header>
						<topbar></topbar>
					</header>
				</section>

				<section class="content">
					<router-outlet></router-outlet>
				</section>

				<!--<footer class="footer"></footer>-->
			</div>
		</div>
	`,
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
}
