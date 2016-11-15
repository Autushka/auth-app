import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SharedDataService} from "../shared-data.service";

@Component({
	selector: 'app-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
	projectDetails: ProjectDetails = {name: ''};
	sharedDataService: SharedDataService;
	router: Router;

	constructor(sharedDataService: SharedDataService, router: Router) {
		this.sharedDataService = sharedDataService;
		this.router = router;
	}

	ngOnInit() {
	}

	onCreate() {
		this.sharedDataService.createProject(this.projectDetails);
		this.router.navigate(['/landing-page/project-list']);
	}
}
