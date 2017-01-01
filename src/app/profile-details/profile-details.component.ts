import {Component, OnInit, ApplicationRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserAccountService} from "../services/user-account.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  profileDetails: any;

  constructor(userAccountService: UserAccountService) {
	  let that = this;

	  userAccountService.profileDetailsStateChange$.subscribe(
		  profileDetails => {
			  that.profileDetails = profileDetails;
		  });
  }

  ngOnInit() {

  }

}
