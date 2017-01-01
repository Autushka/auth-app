import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import anything = jasmine.anything;

@Injectable()
export class GlobalsService {
	isBusyIndicatorShown: any;
	busyIndicatorStateChange$: any;
	firebaseCodec: any;

	constructor() {
		this.initialize();
	}

	changeBusyIndicatorState(isBusyIndicatorShown: boolean) {
		this.isBusyIndicatorShown.next(isBusyIndicatorShown);
	}

	initialize() {
		this.isBusyIndicatorShown = new BehaviorSubject(false);
		this.busyIndicatorStateChange$ = this.isBusyIndicatorShown.asObservable();
		this.firebaseCodec = {
			encode: function (s) {
				var value = encodeURIComponent(s).replace(/\./g, '%2E');
				value = value.replace(/\%/g, '____');
				return value;
			},
			decode: function (s) {
				var value = s.replace(/____/g, '%');
				return decodeURIComponent(value);
			}
		};
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
