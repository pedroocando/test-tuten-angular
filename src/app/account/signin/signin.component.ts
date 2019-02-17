import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification/notification.service';
import { CustomValidators } from '../../shared/form/custom.validators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { distinctUntilChanged, catchError } from 'rxjs/operators';
import { BaseService } from '../../utils/services/base.service';

@Component({
	template: `
		<div i18n="@@signin">
			<div class="dialog-title">Sign in</div>
			<div class="dialog-message">Enter your details below</div>
		</div>

		<form *ngIf="form" [formGroup]="form" (ngSubmit)="login()">
			<fieldset class="fieldset">
				<div class="field-row">
					<div class="field-row-item">
						<label class="label" for="email" i18n="@@email">Email</label>
						<input type="text" formControlName="email" class="form-control">
						<validator [control]="form.controls['email']"></validator>
					</div>
				</div>
				<div class="field-row">
					<div class="field-row-item">
						<label class="label" for="password" i18n="@@password">Password</label>
						<input type="password" formControlName="password" class="form-control">
						<validator [control]="form.controls['password']"></validator>
					</div>
				</div>
			</fieldset>

			<div class="options">
				<button class="btn-text" type="submit" [disabled]="!form.valid">
					<span i18n="@@login">Sign in</span>
				</button>
			</div>
		</form>
	`,
	styleUrls: ['../account.css'],
})
export class SigninComponent implements OnInit {

	form: FormGroup;
	private headers: HttpHeaders;
	private static readonly BASE_URL: string = 'https://dev.tuten.cl/TutenREST/rest/user';
	private static readonly APP: string = 'APP_BCK';
	constructor(
		private http: HttpClient,
		private router: Router,
		private notificationService: NotificationService,
		private fb: FormBuilder,
	) {
		this.headers = new HttpHeaders();
		this.headers = this.headers.append('Accept', 'application/json');
		this.headers = this.headers.append('app', SigninComponent.APP);
	}

	ngOnInit() {
		this.form = this.toFormGroup();
	}

	login(): void {
		this.makeCall(this.form.value['password'],this.form.value['email']).subscribe( response => {
			localStorage.setItem('currentUser', JSON.stringify({email: response.email, token: response.sessionTokenBck}));
			this.notificationService.sucessLogin();
			this.router.navigate(['/dashboard']);
		}, err => {
			this.notificationService.customError(err.name + " - Check access credentials");
			console.log(err);
		});
	}

	private toFormGroup(): FormGroup {
		return this.fb.group({
			email: new FormControl('', [Validators.required, CustomValidators.emailRegex, Validators.maxLength(100)]),
			password: new FormControl('', Validators.required)
		});
	}

	makeCall(password : string, user : string): Observable<any> {
		this.headers = this.headers.append('password', password);
		return this.http.put(SigninComponent.BASE_URL + '/' + user, null , {headers: this.headers})
			.pipe(catchError(BaseService.handleError));
	}
}

