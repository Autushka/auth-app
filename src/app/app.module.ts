import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {RouterModule} from "@angular/router";
import {BusyIndicatorComponent} from './busy-indicator/busy-indicator.component';
import {AuthGuardService} from "./auth-guard.service";
import {ProfileDetailsComponent} from './profile-details/profile-details.component';
// import {ProfileDetailsResolve} from "./profile-details/profile-details-resolve";
import {SharedDataService} from "./shared-data.service";
import { ProjectListComponent } from './project-list/project-list.component';
import {AppRoutingModule} from "./app-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProjectComponent } from './new-project/new-project.component';

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
		NewProjectComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
		AppRoutingModule
		// RouterModule.forRoot([
		// 	{path: '', redirectTo: '/login', pathMatch: 'full'},
		// 	{path: 'login', component: LoginComponent},
		// 	{
		// 		path: 'landing-page',
		// 		component: LandingPageComponent,
		// 		canActivate: [AuthGuardService],
		// 		// resolve: {
		// 		// 	profileDetails: ProfileDetailsResolve
		// 		// }
		// 	}
		// ])
	],
	providers: [AuthGuardService, SharedDataService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
