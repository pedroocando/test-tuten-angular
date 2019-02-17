import { Component } from '@angular/core';
import { TableService } from '../core/models/pager';

@Component({
	template: '<router-outlet></router-outlet>',
	providers: [
		TableService
	]
})
export class RequestServiceComponent {
}
