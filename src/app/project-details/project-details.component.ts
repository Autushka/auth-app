import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProjectEntityService} from "../services/project-entity.service";

@Component({
	selector: 'project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
	projectDetails: ProjectDetails = {name: ''};
	projectEntityService: ProjectEntityService;
	router: Router;
	route: ActivatedRoute;
	projectForm: FormGroup;
	projectGuid: string;

	constructor(projectEntityService: ProjectEntityService, router: Router, fb: FormBuilder, route: ActivatedRoute,) {
		this.projectEntityService = projectEntityService;
		this.router = router;
		this.route = route;

		this.projectForm = fb.group({
			projectName: [null, Validators.required]
		});
	}

	ngOnInit() {
		let that = this;
		this.projectGuid = this.route.snapshot.params['guid'];

		if(this.projectGuid){

			this.projectEntityService.projectDetailsStateChange$.subscribe(data => {
				that.projectForm.controls['projectName'].setValue(data.name);
			});
		}
	}

	onSubmit() {
		if (this.projectForm.valid) {
			this.projectDetails.name = this.projectForm.controls['projectName'].value;

			if(!this.projectGuid){
				this.projectEntityService.createProject(this.projectDetails);
			}else{
				this.projectEntityService.updateProject(this.projectGuid, this.projectDetails);
			}

			this.projectEntityService.isProjectDetailsInitialized = false;
			this.router.navigate(['/landing-page/project-list']);
		}
	}

	onBack() {
		this.projectEntityService.isProjectDetailsInitialized = false;
		this.router.navigate(['/landing-page/project-list']);
	}
}
