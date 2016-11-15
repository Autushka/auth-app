import {Component, OnInit, ApplicationRef} from '@angular/core';
import {SharedDataService} from "../shared-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  profileDetails: ProfileDetails;

  constructor(sharedDataService: SharedDataService, private route: ActivatedRoute) {
	  let that = this;
	  this.profileDetails = route.snapshot.data['resolvedProfileDetails'];

	  sharedDataService.profileDetailsStateChange$.subscribe(
		  profileDetails => {
			  that.profileDetails = profileDetails;
		  });
  }

  ngOnInit() {

  }

}
