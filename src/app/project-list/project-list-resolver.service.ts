import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {SharedDataService} from "../shared-data.service";

@Injectable()
export class ProjectListResolverService  implements Resolve<any> {
	sharedDataService: SharedDataService;

	constructor(sharedDataService: SharedDataService) {
		this.sharedDataService = sharedDataService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			this.sharedDataService.projectListStateChange$.subscribe(
				projectList => {
					if(!this.sharedDataService.isProjectListInitialized){
						this.sharedDataService.initializeProjectList({showBusyIndicator: true});
					}else{
						resolve(projectList);
					}
				});
		});
	}
}

