import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  upcomingEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.upcomingEvent = navParams.data.upcomingEvent;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }

  userProfile() {
    console.log("Hey clicked user profile");
  }

  joinedPeople() {
    console.log("Hey clicked joined people");
  }

}
