import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCuC97XN2ccaTsCLsxqYMDoZqFQ-RIGWO8",
  authDomain: "authapp-400c9.firebaseapp.com",
  databaseURL: "https://authapp-400c9.firebaseio.com",
  storageBucket: "authapp-400c9.appspot.com",
  messagingSenderId: "161010707572"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
