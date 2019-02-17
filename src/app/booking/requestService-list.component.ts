import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService} from '../shared/notification/notification.service';

import { MatTableDataSource, PageEvent } from '@angular/material';
import { TableService } from '../core/models/pager';
import { RequestServiceFilter } from './requestService.filter';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { distinctUntilChanged, catchError } from 'rxjs/operators';
import { BaseService } from '../utils/services/base.service';

@Component({
	template: `
		<h3 class="title">List</h3>
		<div class="mat-elevation-z8e" *ngIf="dataSource">
			<table mat-table [dataSource]="dataSource" matSort (matSortChange)="tableService.sortData($event); list();">
				
			<ng-container matColumnDef="bookingId">
				<th mat-header-cell *matHeaderCellDef mat-sort-header >BookingId</th>
				<td mat-cell *matCellDef="let element">{{element.bookingId}}</td>
			</ng-container>

			<ng-container matColumnDef="bookingFields.firstName">
				<th mat-header-cell *matHeaderCellDef mat-sort-header >Cliente</th>
				<td mat-cell *matCellDef="let element" >{{element.bookingFields.firstName}}</td>
			</ng-container>

			<ng-container matColumnDef="bookingTime">
				<th mat-header-cell *matHeaderCellDef mat-sort-header >Fecha de Creación</th>
				<td mat-cell *matCellDef="let element">{{element.bookingTime | date:'medium'}}</td>
			</ng-container>

			<ng-container matColumnDef="locationId.streetAddress">
				<th mat-header-cell *matHeaderCellDef mat-sort-header >Dirección</th>
				<td mat-cell *matCellDef="let element">{{element.locationId.streetAddress}}</td>
			</ng-container>

			<ng-container matColumnDef="bookingPrice">
				<th mat-header-cell *matHeaderCellDef mat-sort-header >Precio</th>
				<td mat-cell *matCellDef="let element">{{element.bookingPrice}}</td>
			</ng-container>

				<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedColumns;">
				</tr>
			</table>

		</div>


	`
})

export class RequestServiceListComponent implements OnInit {
	//dataSource: [];
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['bookingId', 'bookingFields.firstName', 'bookingTime', 'locationId.streetAddress', 'bookingPrice'];
	isOpenSearchPanel = false;

	filter = new RequestServiceFilter(this.tableService.filter);
	private headers: HttpHeaders;
	private static readonly BASE_URL: string = 'https://dev.tuten.cl/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true';
	private static readonly APP: string = 'APP_BCK';
	private email;
	private token;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private requestServiceService: RequestServiceService,
		public tableService: TableService<any>,
		private notificationService: NotificationService,
		private http: HttpClient
	) {
		this.headers = new HttpHeaders();
		this.headers = this.headers.append('Accept', 'application/json');
		this.headers = this.headers.append('app', RequestServiceListComponent.APP);
		this.email = JSON.parse(localStorage.getItem('currentUser')).email;
		this.token = JSON.parse(localStorage.getItem('currentUser')).token;
		this.headers = this.headers.append('adminemail', this.email);
		this.headers = this.headers.append('token', this.token);
	}

	ngOnInit() {
		this.list();
	}


	list(event?: PageEvent) {
        this.makeCall().subscribe( response => {
			//this.dataSource = response;
			for (const r of response) {
				r.bookingFields = JSON.parse(r.bookingFields);
			  }
			  console.log(response[0].bookingFields.firstName);
			this.dataSource = new MatTableDataSource<any>(response);
			this.tableService.selection.clear(); 
		}, err =>{
			console.log("error");
			this.notificationService.customError("No se pudo realizar la busqueda, chequee la consola")
			console.log(err)
		});
	}

	search() {
		this.isOpenSearchPanel = false;
		this.tableService.pager.pageIndex = 0;
		this.tableService.filter = new RequestServiceFilter(this.filter);
		this.list();
	}

	compareFn(c1: any, c2: any): boolean { console.log()
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	makeCall(): Observable<any> {
		return this.http.get(RequestServiceListComponent.BASE_URL, {headers: this.headers})
			.pipe(catchError(BaseService.handleError));
	}
}
