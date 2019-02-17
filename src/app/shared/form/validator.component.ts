import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'validator',
	template: `
		<div class="error-message-wrap">
			<div *ngIf="control.hasError('noMatch')" class="error-message" i18n="@@validator-noMatches">No matches</div>

			<div *ngIf="control.hasError('required')" class="error-message" i18n="@@validator-required">Required</div>

			<!--<div *ngIf="control.hasError('pattern')" class="error-message" i18n="@@validator-invalid">Invalid</div>-->

			<div *ngIf="control.hasError('emailRegex')" class="error-message" i18n="@@validator-email">Email invalid. The format should be example@dot.com</div>

			<div *ngIf="(control.dirty || control.touched) && control.hasError('integerRegex')" class="error-message" i18n="@@validator-integer">Number invalid, only integer numbers</div>

			<div *ngIf="(control.dirty || control.touched) && control.hasError('numberRegex')" class="error-message" i18n="@@validator-number">Number invalid (use '.' to float numbers)</div>

			<div *ngIf="control.hasError('minlength')" class="error-message" i18n="@@validator-minlength">Must have at least {{control.getError('maxlength').requiredLength}} characters</div>

			<div *ngIf="control.hasError('maxlength')" class="error-message" i18n="@@validator-maxlength">Must have maximum {{control.getError('maxlength').requiredLength}} characters</div>

			<div *ngIf="control.hasError('min')" class="error-message" i18n="@@validator-min">Must not be less than {{control.getError('min')}}</div>

			<div *ngIf="control.hasError('max')" class="error-message" i18n="@@validator-max">Must not be greater than {{control.getError('max')}}</div>
		</div>
	`
})
export class ValidatorComponent {
	@Input() control: AbstractControl;
}
