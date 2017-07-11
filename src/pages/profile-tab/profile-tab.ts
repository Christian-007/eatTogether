import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

/**
 * Generated class for the ProfileTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-tab',
  templateUrl: 'profile-tab.html',
})
export class ProfileTabPage {
  fname: string; lname: string;
  email: string; id: string;
  location: string;

  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public restapiService: RestapiserviceProvider) {
    let currentUser = this.restapiService.getUserInfo();
    this.id = currentUser["id"];
    this.fname = currentUser["fname"]; this.lname = currentUser["lname"];
    this.email = currentUser["email"]; this.location = currentUser["location"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileTabPage');
  }

  logoutPage() {
    this.restapiService.logout();
    this.events.unsubscribe('pageChange');
    this.navCtrl.parent.parent.pop();
  }
}
