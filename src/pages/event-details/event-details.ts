import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';

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
  upcomingEvent; usersArray: any; eventInfo: any;
  currentUser: any;
  isUserJoined = false; isUserHost = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tabsService: TabsServiceProvider, public restapiService: RestapiserviceProvider) {
    this.upcomingEvent = navParams.data.upcomingEvent;
    this.currentUser = this.restapiService.getUserInfo();
    this.checkIfUserHasJoined();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }

  checkIfUserHasJoined() {
    this.tabsService.checkUsersInEvent(this.upcomingEvent["id"])
    .then(data => {
      this.usersArray = data;
      for(let user of this.usersArray) { 
        if(user["id"]==this.currentUser["id"]){
          this.isUserJoined = true;
        }
      }
      this.checkEventInfo();
    });
  }

  checkEventInfo() {
    this.tabsService.checkEventInformation(this.upcomingEvent["id"])
    .then(data => {
      this.eventInfo = data;
      if(this.eventInfo["user_id"]==this.currentUser["id"]){
        this.isUserHost = true;
      }
      console.log("IS HOST: " + this.isUserHost);
    });
  }

  userProfile() {
    console.log("Hey clicked user profile");
  }

  joinedPeople() {
    console.log("Hey clicked joined people");
  }

}
