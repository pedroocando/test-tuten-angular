import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class BaseService {

	public static extractData(res: any) {
		let body = res.json();
		return body.result;
	}

	public static extractDataFull(res: Response) {
		return res.json();
	}

	public static extractHeaders(res: Response) {
		return res.headers;
	}

	public static handleResponse(res: Response) {
		return res.ok;
	}

	public static handleError (error: HttpErrorResponse | any) {
		if (error instanceof Error) {
			// A client-side or network error occurred. Handle it accordingly.
			console.log('An error occurred: ', error.message ? error.message : error.toString());
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.log(`Backend returned code: ${error.status} - ${error.statusText}, body was: ${error.message}`);
		}
		console.log('Raw error:', error.status);
		return throwError(error);
	}

}
