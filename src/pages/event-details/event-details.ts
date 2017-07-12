import { Component, NgZone } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
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
  loading: Loading; alert: Alert;
  peopleData: any; peopleArray: any;
  ownerStatus: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events, 
    public tabsService: TabsServiceProvider, 
    public restapiService: RestapiserviceProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private zone: NgZone
    ) {
    this.upcomingEvent = navParams.data.upcomingEvent;
    this.currentUser = this.restapiService.getUserInfo();
    this.checkIfUserHasJoined();
    this.getPeopleInEvents();
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

  getPeopleInEvents() {
    this.tabsService.getParticipants(this.upcomingEvent["id"])
    .then(data => {
      this.peopleData = data;
      this.peopleArray = [];
      for(let people of this.peopleData) { 
        this.peopleArray.push({
          id: people.id,
          user_fname: people.fname,
          user_lname: people.lname,
          email: people.email,
          location: people.location,
          event_id: people.event_id
        });
      }
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

  joinEvent() {
    this.showLoading("Joining event..");

    this.tabsService.joinEventPost(this.currentUser["id"], this.upcomingEvent["id"])
    .then(data => {
      // console.log(JSON.stringify(data));
      // this.loading.dismiss();
      this.isUserJoined = true;
      let param = { 'isChange': true };
      this.events.publish('pageChange', param);
      this.zone.run(() => {
        console.log('force update the screen');
        this.getPeopleInEvents();
      });
    }, error => {
      // console.log(JSON.stringify(error.json()));
      // this.loading.dismiss();
      this.showAlertError();
    });
    this.loading.dismiss();
    this.showAlertSuccess("Join", "joined");
  }

  cancelEvent() {
    if(this.currentUser["id"] == this.upcomingEvent["user_id"]){
      // OWNER
      this.ownerStatus = "owner";
      this.showAlertConfirm("Are you sure you want to cancel this event? This will remove the event");
    }else{
      // NOT OWNER
      this.ownerStatus = "not_owner";
      this.showAlertConfirm("Are you sure you want to cancel joining this event?");
    }
  }

  showAlertConfirm(content: string) {
    let confirm = this.alertCtrl.create({
      title: 'Cancel Event',
      message: content,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Nothing happened');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.httpRequestCancelEvent();
          }
        }
      ]
    });
    confirm.present();
  }

  httpRequestCancelEvent() {
    this.showLoading("Cancel joining event..");

    this.tabsService.cancelJoinEvent(this.currentUser["id"], this.upcomingEvent["id"], this.upcomingEvent["user_id"])
    .then(data => {
      // console.log(JSON.stringify(data));
      this.isUserJoined = false;
      let param = { 'isChange': true };
      this.events.publish('pageChange', param);

      // Check whether Owner or not
      if(this.ownerStatus==="owner"){ // if owner, pop/dismiss current page
        console.log("POP");
        this.navCtrl.pop();
      }
      else { // otherwise, only rerender the current page
        this.zone.run(() => {
          console.log('force update the screen');
          this.getPeopleInEvents();
        });
      }
    }, error => {
      // console.log(JSON.stringify(error.json()));
      this.showAlertError();
    });
    this.loading.dismiss();
    this.showAlertSuccess("Cancel", "cancelled joining");
  }

  showLoading(text) {
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  userProfile() {
    console.log("Hey clicked user profile");
  }

  joinedPeople() {
    console.log("Hey clicked joined people");
  }

  showAlertSuccess(infoTitle: string, infoSub: string) {
    this.alert = this.alertCtrl.create({
      title: infoTitle + " Event",
      subTitle: "Successfully " + infoSub + " event!",
      buttons: ['OK']
    });
    this.alert.present();
  }

  showAlertError() {
    this.alert = this.alertCtrl.create({
        title: "ERROR",
        subTitle: "Server error problem.",
        buttons: ['CLOSE']
    });
    this.alert.present();
  }

}
