import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }  from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { NotificationService } from './shared/notification/notification.service';
import { AccountModule } from './account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
		ReactiveFormsModule,
    FormsModule,
    DashboardModule,
		HttpClientModule,
		BrowserAnimationsModule,
		SharedModule,
		AccountModule,
  ],
  providers: [
		NotificationService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
