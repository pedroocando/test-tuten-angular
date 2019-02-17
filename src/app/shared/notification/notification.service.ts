import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class   NotificationService {
	public nsuccess;
	public nerror;
	public nerror400;
	public nerror401;
	public nerror404;
	public nerror409;
	public nduplicate;

	constructor(private service: NotificationsService) { }

	sucess() {
		this.service.success(this.nsuccess);
	}

	sucessInsert(name?: string) { // escalable para mensaje personalizado
		this.service.success(this.nsuccess);
	}

	sucessUpdate(name?: string) { // escalable para mensaje personalizado
		this.service.success(this.nsuccess);
	}

	sucessDelete(name?: string) { // escalable para mensaje personalizado
		this.service.success(this.nsuccess);
	}

	sucessLogout() { // escalable para mensaje personalizado
		this.service.success(this.nsuccess);
	}

	errorDuplicated(name?: string) {
		this.service.error(this.nerror);
	}

	errorGuard() {
		this.service.info('No autorizado', 'No posee los permisos para esta operación');
	}

	error(error?: Response) {
		console.log(error);
		if (error) {
			switch (error.status) {
				case 400: // Bad Request
				this.service.error(this.nerror400);
					break;
				case 401: // Unauthorized
				this.service.error(this.nerror401);
					break;
				case 403: // Forbiden
					this.errorGuard();
					break;
				case 404: // Not Found
				this.service.error(this.nerror404);
					break;
				case 409: // Conflict
				this.service.error(this.nerror409);
					break;
				default:
					this.service.error(this.nerror);
			}
		} else {
			this.service.error(this.nerror);
		}
	}

	customError(msg) {
		this.service.error(msg);
	}

	sucessLogin() {
		this.service.success('Successful Login', 'You entered correctly');
	}

	genericsuccess(title: string, body: string) {
		this.service.success(title, body);
	}
}
