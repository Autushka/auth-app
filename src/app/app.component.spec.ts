/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BusyIndicatorComponent} from './busy-indicator/busy-indicator.component';
import {AppRoutingModule} from "./app-routing.module";

import {LoginComponent} from './login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {BusyIndicatorComponent} from './busy-indicator/busy-indicator.component';
import {AuthGuardService} from "./auth-guard.service";
import {ProfileDetailsComponent} from './profile-details/profile-details.component';

import {ProjectListComponent} from './project-list/project-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {UserAccountService} from "./services/user-account.service";
import {GlobalsService} from "./services/globals.service";
import {ProjectEntityService} from "./services/project-entity.service";
import {AngularFire} from 'angularfire2';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {APP_BASE_HREF} from '@angular/common';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

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

describe('App: AuthApp3', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
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
			imports: [AppRoutingModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
				ReactiveFormsModule],
			providers: [{provide: APP_BASE_HREF, useValue: '/'}, AngularFire, UserAccountService, GlobalsService!]
		});
	});

	it('should create the app', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have as title 'app works!'`, async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('app works!');
	}));

	it('should render title in a h1 tag', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('app works!');
	}));
});
