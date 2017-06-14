import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { EventTabPage } from '../event-tab/event-tab';
import { ProfileTabPage } from '../profile-tab/profile-tab';
import { HomeTabPage } from '../home-tab/home-tab';
import { MapsTabPage } from '../maps-tab/maps-tab';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  homeTabRoot = HomeTabPage
  eventTabRoot = EventTabPage
  mapsTabRoot = MapsTabPage
  profileTabRoot = ProfileTabPage


  constructor(public navCtrl: NavController) {}

}
