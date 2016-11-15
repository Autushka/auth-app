import { Component, OnInit } from '@angular/core';
import {SharedDataService} from "../shared-data.service";

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent implements OnInit {
  isBusyIndicatorShown: boolean;

  constructor(sharedDataService: SharedDataService) {
    sharedDataService.busyIndicatorStateChange$.subscribe(
      isBusyIndicatorShown => {
        this.isBusyIndicatorShown = isBusyIndicatorShown;
      });
  }

  ngOnInit() {
  }

}
