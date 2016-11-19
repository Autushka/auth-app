import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ProjectEntityService} from "../services/project-entity.service";

@Injectable()
export class ProjectDetailsResolverService  implements Resolve<any> {
	projectEntityService: ProjectEntityService;

	constructor(projectEntityService: ProjectEntityService) {
		this.projectEntityService = projectEntityService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			this.projectEntityService.projectDetailsStateChange$.subscribe(
				projectDetails => {
					if(!this.projectEntityService.isProjectDetailsInitialized){
						this.projectEntityService.isProjectDetailsInitialized = true;
						this.projectEntityService.getProject(route.params['guid'], {showBusyIndicator: true});
					}else{
						resolve(projectDetails);
					}
				});
		});
	}
}
