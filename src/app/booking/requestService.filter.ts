import { HttpParams } from '@angular/common/http';

export class RequestServiceFilter {
	bookingPrice: number;
	bookingId: number;
	

	constructor(filter?: RequestServiceFilter) {
		if (filter) {
			this.bookingPrice = filter.bookingPrice;
			this.bookingId = filter.bookingId;
		}
	}

	getHttpParams(httpParams = new HttpParams()): HttpParams {
		if (this.bookingPrice) {
			httpParams = httpParams.set('bookingPrice', this.bookingPrice.toString());
		}
		if (this.bookingId) {
			httpParams = httpParams.set('bookingId', this.bookingId.toString());
		}
		return httpParams;
	}
}
