import { Injectable } from '@angular/core';
import { Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface Pager {
	totalEntities?: number;
	totalEntitiesPerPage?: number;
	pageIndex: number;
	pageSize: number;
	pages?: number;
	startIndex?: number;
	endIndex?: number;
}

@Injectable()
export class TableService<T> {
	pager: Pager = {pageIndex: 0, pageSize: 20};
	sort: string;
	selection = new SelectionModel<T>(true, []);
	filter: any;

	constructor() {}

	sortData(sort: Sort) {
		if (sort.direction === 'asc') {
			this.sort = sort.active;
		} else if (sort.direction === 'desc') {
			this.sort = '-' + sort.active;
		} else {
			this.sort = undefined;
		}
	}

	isAllSelected(numRows: number) {
		const numSelected = this.selection.selected.length;
		// const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	masterToggle(data: T[]) {
		this.isAllSelected(data.length) ?
			this.selection.clear() :
			// this.dataSource.data.forEach(row => this.selection.select(row));
			data.forEach(row => this.selection.select(row));
	}
}
