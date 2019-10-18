import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tasklist/tasklist';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Dialogs } from '@ionic-native/dialogs';

export const firebaseConfig = {
  apiKey: "AIzaSyBbbxeVTIdiZOhWY290mtepXlzX2ad6rA4",
  authDomain: "ionic2do-62a10.firebaseapp.com",
  databaseURL: "https://ionic2do-62a10.firebaseio.com",
  projectId: "ionic2do-62a10",
  storageBucket: "ionic2do-62a10.appspot.com",
  messagingSenderId: "760775273457"
};

@NgModule({
  declarations: [
    MyApp,
    TaskListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
