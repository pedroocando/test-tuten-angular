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
import * as _ from 'underscore';

@Component({
	template: `
		<h3 class="title">List</h3>
		<mat-accordion>
			<mat-expansion-panel [expanded]="isOpenSearchPanel" (opened)="openSearchPanel(true)" [hideToggle]="true">
				<mat-expansion-panel-header>
					<div *ngIf="tableService.filter" class="filter-panel-header fieldset-wrap">
            			<div class="field-row">

							<div class="field-row-item">
								<span class="label" i>ID</span>
								<span>{{filter.id}}</span>
							</div>
              
							<div class="field-row-item" >
								<span class="label">Precio</span>
								<span>{{filter.bookingPrice}}</span>
              				</div>
              
						</div>
					</div>
					<button class="btn-icon"  title="Buscar" type="button">
						<i class="material-icons">search</i>
					</button>
				</mat-expansion-panel-header>

				<form>
					<fieldset class="fieldset">

						<div class="field-row">
									<div class="field-row-item">
											<label class="label" for="id">ID</label>
											<input type="number" name="id" placeholder="None"  [(ngModel)]="filter.id">
									</div>
						</div>

							<div class="field-row">
										<div class="field-row-item">
											<label class="label" for="bookingPrice">Precio</label>
											<input type="number" name="bookingPrice" placeholder="None"  [(ngModel)]="filter.bookingPrice">
										</div>
							</div>
            
					</fieldset>
					<div class="options">
						<button class="btn-text gray" type="button" (click)="reset()">
							<span >Reset</span>
						</button>
						<button class="btn-text blue" type="button" (click)="search()">
							<span>Search</span>
						</button>
					</div>
				</form>
			</mat-expansion-panel>
		</mat-accordion>

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
	items= [];
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
		if(this.tableService.sort != undefined){
			let sortedArray = _.sortBy(this.items, this.tableService.sort );
			this.dataSource = new MatTableDataSource<any>(sortedArray); 
			this.tableService.sort = undefined;
		}else{
			this.makeCall().subscribe( response => {
				// convertimos de string a Json para poder tomar los datos
				for (const r of response) {
					r.bookingFields = JSON.parse(r.bookingFields);
				}
				this.items = response;
				this.dataSource = new MatTableDataSource<any>(response);
				this.tableService.selection.clear(); 
			}, err =>{
				console.log("error");
				this.notificationService.customError("No se pudo realizar la busqueda, chequee la consola")
				console.log(err)
			});
		}
	}
	// servicio que busca el listado
	makeCall(): Observable<any> {
		return this.http.get(RequestServiceListComponent.BASE_URL, {headers: this.headers})
			.pipe(catchError(BaseService.handleError));
	}

	reset() {
		this.filter = new RequestServiceFilter();
		this.list();
	  }
	  
	  search() {
		// array que almacenara la busqueda
		let array = [];
		this.isOpenSearchPanel = false;
		this.tableService.pager.pageIndex = 0;
		this.tableService.filter = new RequestServiceFilter(this.filter);
		// si existe este filtro, buscamos por id
		if(this.filter['id'] != undefined){
			array = this.items.filter(item => item.bookingId == this.filter['id']);
		}
		if(this.filter['bookingPrice'] != undefined){
			array = this.items.filter(item => item.bookingPrice == this.filter['bookingPrice']);
		}
		this.dataSource = new MatTableDataSource<any>(array);
	  }

	  openSearchPanel(value: boolean) {
		this.isOpenSearchPanel = value;
		this.filter = new RequestServiceFilter(this.tableService.filter);
	  }
}
