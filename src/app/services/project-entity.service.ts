import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
	FirebaseObjectObservable,
	FirebaseListObservable
} from "angularfire2";
import anything = jasmine.anything;
import {GlobalsService} from "./globals.service";
import {UserAccountService} from "./user-account.service";

@Injectable()
export class ProjectEntityService {
	projectList: any;
	projectListSnapshot: any;
	isProjectListInitialized = false;
	projectListSubscriber: any;

	projectDetails: any;
	projectDetailsSubscriber: any;
	isProjectDetailsInitialized: boolean;

	projectListAF: FirebaseListObservable<any>;
	projectDetailsAF: FirebaseObjectObservable<any>;
	projectListStateChange$: any;
	projectDetailsStateChange$: any;

	globalsService: GlobalsService;
	userAccountService: UserAccountService;

	constructor(globalsService: GlobalsService, userAccountService: UserAccountService) {
		this.globalsService = globalsService;
		this.userAccountService = userAccountService;
		this.initialize();
	}

	changeProjectListState(projectList: any) {
		this.projectList.next(projectList);
		this.projectListSnapshot = projectList;
	}

	changeProjectDetailsState(projectDetails: any) {
		this.projectDetails.next(projectDetails);
	}

	initialize() {
		this.projectList = new BehaviorSubject([]);
		this.projectListSnapshot = [];
		this.isProjectListInitialized = false;
		if (this.projectListSubscriber) {
			this.projectListSubscriber.unsubscribe();
		}

		this.projectDetails = new BehaviorSubject({name: ''});
		this.isProjectDetailsInitialized = false;
		if (this.projectDetailsSubscriber) {
			this.projectDetailsSubscriber.unsubscribe();
		}

		this.projectListStateChange$ = this.projectList.asObservable();
		this.projectDetailsStateChange$ = this.projectDetails.asObservable();
	}

	getProject(guid, params: FireBaseCallParams) {
		let that = this;
		if (this.userAccountService.isAdmin) {
			this.projectDetailsAF = this.userAccountService.af.database.object('/projects/' + guid);//.subscribe(data => {return data});
		} else {
			this.projectDetailsAF = this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + guid);//.subscribe(data => {return data});
		}

		if (params.showBusyIndicator) {
			this.globalsService.changeBusyIndicatorState(true);
		}

		this.projectDetailsSubscriber = this.projectDetailsAF.subscribe(data => {
			that.changeProjectDetailsState({name: data.name});//making sure that sorting is in descending order

			if (params.showBusyIndicator) {
				this.globalsService.changeBusyIndicatorState(false);
			}
		});
	}

	deleteProject(guid) {
		this.userAccountService.af.database.object('/projects/' + guid).remove();// remove project from the global list
		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + guid).remove();// remove project from the user project list
	}

	updateProject(guid: string, projectDetails: ProjectDetails) {
		this.userAccountService.af.database.object('/projects/' + guid).update({name: projectDetails.name});
		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + guid).update({name: projectDetails.name});
	}

	createProject(projectDetails: ProjectDetails) {
		let guid = this.globalsService.generateGuild();
		let createdAt = (new Date()).getTime();

		this.userAccountService.af.database.object('/projects/' + guid).set({
			name: projectDetails.name,
			createdBy: this.userAccountService.auth.uid,
			createdAt: createdAt
		});

		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + guid).set({
			name: projectDetails.name,
			createdBy: this.userAccountService.auth.uid,
			createdAt: createdAt
		});

		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + guid + '/roles/admin').set({
			admin: true
		});

		this.userAccountService.af.database.object('/projects/' + guid + '/users/' + this.userAccountService.auth.uid).set({
			firstName: this.userAccountService.profileDetailsSnapshot.firstName,
			lastName: this.userAccountService.profileDetailsSnapshot.lastName,
			email: this.userAccountService.profileDetailsSnapshot.email,
			photoURL: this.userAccountService.profileDetailsSnapshot.photoURL
		});

		this.userAccountService.af.database.object('/projects/' + guid + '/users/' + this.userAccountService.auth.uid + '/roles/admin').set({
			admin: true
		});
	}

	initializeProjectList(params: FireBaseCallParams) {
		let that = this;
		this.isProjectListInitialized = true;

		if (params.showBusyIndicator) {
			this.globalsService.changeBusyIndicatorState(true);
		}

		if (this.userAccountService.isAdmin) {
			this.projectListAF = this.userAccountService.af.database.list('/projects');
		} else {
			this.projectListAF = this.userAccountService.af.database.list('/users/' + this.userAccountService.auth.uid + '/projects');
		}

		this.projectListAF.subscribe(projects => {
			if (params.showBusyIndicator) {
				this.globalsService.changeBusyIndicatorState(false);
			}
			that.changeProjectListState(projects);


			// Observable.forkJoin(projectUserKeysObs)
			// 	.subscribe(projectUserKeys => {
			// 		let projectUsersObsList = [];


		});

	}
}
