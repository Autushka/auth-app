import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import anything = jasmine.anything;

@Injectable()
export class GlobalsService {
	isBusyIndicatorShown: any;
	busyIndicatorStateChange$: any;

	constructor() {
		this.initialize();
	}

	changeBusyIndicatorState(isBusyIndicatorShown: boolean) {
		this.isBusyIndicatorShown.next(isBusyIndicatorShown);
	}

	initialize() {
		this.isBusyIndicatorShown = new BehaviorSubject(false);
		this.busyIndicatorStateChange$ = this.isBusyIndicatorShown.asObservable();
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
}
