import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
	AngularFireAuth, FirebaseAuthState, AngularFire, FirebaseObjectObservable,
	FirebaseListObservable
} from "angularfire2";
import anything = jasmine.anything;
import { ObservableInput } from 'rxjs/Observable';

let profileDetails: ProfileDetails = {};

@Injectable()
export class SharedDataService {
	private isBusyIndicatorShown = new BehaviorSubject(false);
	isAdmin = false;

	profileDetails = new BehaviorSubject(profileDetails);
	profileDetailsSnapshot: ProfileDetails = {firstName: '', lastName: '', email: '', photoURL: ''};
	isProfileDetailsInitialized = false;

	projectList = new BehaviorSubject([]);
	projectListSnapshot = [];
	isProjectListInitialized = false;
	projectListSubscriber: any;

	adminCheck = new BehaviorSubject({isAdmin: false});
	isAdminCheckInitialized = false;

	auth: FirebaseAuthState;
	af: AngularFire;
	profileDetailsAF: FirebaseObjectObservable<any>;
	projectListAF: FirebaseListObservable<any>;
	adminCheckAF: FirebaseObjectObservable<any>;

	busyIndicatorStateChange$ = this.isBusyIndicatorShown.asObservable();
	profileDetailsStateChange$ = this.profileDetails.asObservable();
	projectListStateChange$ = this.projectList.asObservable();
	adminCheckStateChange$ = this.adminCheck.asObservable();

	constructor() {
	}

	// Service message commands
	changeBusyIndicatorState(isBusyIndicatorShown: boolean) {
		this.isBusyIndicatorShown.next(isBusyIndicatorShown);
	}

	changeProfileDetailsState(profileDetails: any) {
		this.profileDetails.next(profileDetails);
		this.profileDetailsSnapshot = profileDetails;
	}

	changeProjectListState(projectList: any) {
		this.projectList.next(projectList);
		this.projectListSnapshot = projectList;
	}

	changeAdminCheckState(adminCheck: any) {
		this.adminCheck.next(adminCheck);
	}

	setAF(af: AngularFire) {
		this.af = af;
	}

	setAuth(auth: FirebaseAuthState) {
		this.auth = auth;
	}

	getAuth() {
		return this.auth;
	}

	initializeSharedData() {
		this.isAdmin = false;

		this.isBusyIndicatorShown = new BehaviorSubject(false);
		this.profileDetails = new BehaviorSubject(profileDetails);
		this.projectList = new BehaviorSubject([]);
		this.projectListSubscriber.unsubscribe();
		this.adminCheck = new BehaviorSubject({isAdmin: false});

		this.profileDetailsSnapshot = {firstName: '', lastName: '', email: '', photoURL: ''};;
		this.isProfileDetailsInitialized = false;

		this.projectListSnapshot = [];
		this.isProjectListInitialized = false;

		this.isAdminCheckInitialized = false;

		this.busyIndicatorStateChange$ = this.isBusyIndicatorShown.asObservable();
		this.profileDetailsStateChange$ = this.profileDetails.asObservable();
		this.projectListStateChange$ = this.projectList.asObservable();
		this.adminCheckStateChange$ = this.adminCheck.asObservable();
}

	generateGuild() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + '-' + s4() + '-' + s4();
	}

	createProject(projectDetails: ProjectDetails) {
		let guid = this.generateGuild();
		let createdAt = (new Date()).getTime();

		this.af.database.object('/projects/' + guid).set({
			name: projectDetails.name,
			createdBy: this.auth.uid,
			createdAt: createdAt
		});

		this.af.database.object('/users/' + this.auth.uid + '/projects/' + guid).set({
			name: projectDetails.name,
			createdBy: this.auth.uid,
			createdAt: createdAt
		});

		this.af.database.object('/users/' + this.auth.uid + '/projects/' + guid + '/roles/admin').set({
			admin: true
		});

		this.af.database.object('/projects/' + guid + '/users/' + this.auth.uid).set({
			firstName: this.profileDetailsSnapshot.firstName,
			lastName: this.profileDetailsSnapshot.lastName,
			email: this.profileDetailsSnapshot.email,
			photoURL: this.profileDetailsSnapshot.photoURL
		});

		this.af.database.object('/projects/' + guid + '/users/' + this.auth.uid + '/roles/admin').set({
			admin: true
		});
	}

	initializeAdminCheck(params: FireBaseCallParams){
		this.adminCheckAF = this.af.database.object('/admins/' + this.auth.uid);

		this.isAdminCheckInitialized = true;

		this.adminCheckAF.first().subscribe(data => {
			if (data.$exists()) {
				this.isAdmin = true;
				this.changeAdminCheckState({isAdmin: true});
			}else{
				this.isAdmin = false;
				this.changeAdminCheckState({isAdmin: false});
			}
		});
	}

	initializeProjectList(params: FireBaseCallParams) {
		let that = this;

		if(this.isAdmin){
			this.projectListAF = this.af.database.list('/projects');
		}else{
			this.projectListAF = this.af.database.list('/users/' + this.auth.uid + '/projects');
		}

		this.isProjectListInitialized = true;

		if (params.showBusyIndicator) {
			this.changeBusyIndicatorState(true);
		}

		this.projectListSubscriber = this.projectListAF.subscribe(data => {
			that.changeProjectListState(data);

			if (params.showBusyIndicator) {
				this.changeBusyIndicatorState(false);
			}
		});
	}

	initializeProfileDetails(params: FireBaseCallParams) {
		let that = this;
		this.profileDetailsAF = this.af.database.object('/users/' + this.auth.uid);
		this.isProfileDetailsInitialized = true;

		if (params.showBusyIndicator) {
			this.changeBusyIndicatorState(true);
		}

		this.profileDetailsAF.first().subscribe(data => {
			let firstName = '';
			let lastName = '';
			let newUserProfile: ProfileDetails = {firstName: '', lastName: '', email: '', photoURL: ''};

			if (!data.$exists()) {
				switch (that.auth.provider) {
					case 3: { // google.com
						firstName = that.auth.auth.providerData[0].displayName.split(' ')[0];
						lastName = that.auth.auth.providerData[0].displayName.split(' ')[1];
						newUserProfile = {
							firstName: firstName,
							lastName: lastName,
							email: that.auth.auth.providerData[0].email,
							photoURL: that.auth.auth.providerData[0].photoURL
						};
						break;
					}
				}
				that.profileDetailsAF.set(newUserProfile);
				that.changeProfileDetailsState(newUserProfile);
			} else {
				newUserProfile.firstName = data.firstName;
				newUserProfile.lastName = data.lastName;
				newUserProfile.email = data.email;
				newUserProfile.photoURL = data.photoURL;

				that.changeProfileDetailsState(newUserProfile);
			}

			if (params.showBusyIndicator) {
				this.changeBusyIndicatorState(false);
			}
		});
	}
}
