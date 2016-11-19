import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../services/globals.service";

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent implements OnInit {
  isBusyIndicatorShown: boolean;

  constructor(globalsService: GlobalsService) {
	  globalsService.busyIndicatorStateChange$.subscribe(
      isBusyIndicatorShown => {
        this.isBusyIndicatorShown = isBusyIndicatorShown;
      });
  }

  ngOnInit() {
  }

}
