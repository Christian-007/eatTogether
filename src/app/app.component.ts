import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = EditProfilePage;
  // rootPage:any = TabsPage;
  // rootPage:any = EventDetailsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
