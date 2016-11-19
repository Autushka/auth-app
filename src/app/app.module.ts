import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {BusyIndicatorComponent} from './busy-indicator/busy-indicator.component';
import {AuthGuardService} from "./auth-guard.service";
import {ProfileDetailsComponent} from './profile-details/profile-details.component';

import {ProjectListComponent} from './project-list/project-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {UserAccountService} from "./services/user-account.service";
import {GlobalsService} from "./services/globals.service";
import {ProjectEntityService} from "./services/project-entity.service";

// Must export the config
export const firebaseConfig = {
	apiKey: "AIzaSyCuC97XN2ccaTsCLsxqYMDoZqFQ-RIGWO8",
	authDomain: "authapp-400c9.firebaseapp.com",
	databaseURL: "https://authapp-400c9.firebaseio.com",
	storageBucket: "authapp-400c9.appspot.com",
	messagingSenderId: "161010707572"
};

const firebaseAuthConfig = {
	provider: AuthProviders.Google,
	method: AuthMethods.Popup
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LandingPageComponent,
		BusyIndicatorComponent,
		ProfileDetailsComponent,
		ProjectListComponent,
		DashboardComponent,
		ProjectDetailsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [AuthGuardService, UserAccountService, GlobalsService, ProjectEntityService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
