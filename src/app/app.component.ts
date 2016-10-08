import {Component} from '@angular/core';
import {Auth} from './auth.service';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  providers: [Auth],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'guest book';
  guestMessages: FirebaseListObservable<any>;

  constructor(private auth: Auth, af: AngularFire) {
    this.guestMessages = af.database.list('/guestMessages');
  }

  addMessage(newMessage: string) {
    this.guestMessages.push({content: newMessage})
  }

  onMessageInputKeyUp(keyCode: number, message: string) {
    if (keyCode === 13 && message !== '') {
      this.addMessage(message);
    }
  }
}
