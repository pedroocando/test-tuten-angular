import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {
	
	dataMenuItem: string;
	selection = new SelectionModel<string>(true, []);

	constructor(
		private activatedRoute: ActivatedRoute
	) {
		//this.selection.select(this.NAV_SERVICE_ORDERS, this.NAV_SERVICE_PARTS, this.NAV_PRODUCTS_SERVICES, this.NAV_COMPANIES_STORES, this.NAV_USERS);
	}

	ngOnInit() {
		if (this.activatedRoute.firstChild && this.activatedRoute.firstChild.data) {
			this.activatedRoute.firstChild.data.subscribe(data => {
				if (data['menu']) {
					this.dataMenuItem = data['menu'];
				}
			});
		}
	}

	select(event: any) {
		this.dataMenuItem = event.target.getAttribute('data-menu-item');
	}
}
