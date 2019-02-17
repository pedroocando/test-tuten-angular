import { HttpParams } from '@angular/common/http';

export class RequestServiceFilter {
	dtype: string;
	id: number;
	

	constructor(filter?: RequestServiceFilter) {
		if (filter) {
			this.dtype = filter.dtype;
			this.id = filter.id;
		}
	}

	getHttpParams(httpParams = new HttpParams()): HttpParams {
		if (this.dtype) {
			httpParams = httpParams.set('dtype', this.dtype);
		}
		if (this.id) {
			httpParams = httpParams.set('id', this.id.toString());
		}
		return httpParams;
	}
}
