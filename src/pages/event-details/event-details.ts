import { Component, NgZone } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { UserListPage } from '../../pages/user-list/user-list';

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
  ownerStatus: string; ownerProfile: any;
  hours: any; minutes: any;
  year: any; month: any; date: any;
  userActivity: string;

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
    this.checkIfUserHasJoined()
    .then(data => {
      console.log("FINISHED CHECK USER");
      console.log(data);

      this.checkEventInfo()
      .then(data => {
        console.log("FINISHED CHECK EVENT INFO");
        console.log(data);

        this.getPeopleInEvents()
        .then(data => {
          console.log("FINISHED GET PEOPLE");
        }, error => {
          console.log("ERROR GET PEOPLE");
          console.log(JSON.stringify(error.json()));
        });

      }, error => {
        console.log("ERROR CHECK EVENT");
        console.log(error);
        this.alert = this.alertCtrl.create({
            title: "ERROR: Event Not Found",
            subTitle: "This event does not exist anymore.",
            buttons: 
            [
              {
                text: 'OK',
                handler: data => {
                  console.log('Cancel clicked');
                  let param = { 'isChange': true };
                  this.events.publish('pageChange', param);
                  this.navCtrl.pop();
                }
              }
            ]
        });
        this.alert.present();
      });

    }, error => {
      console.log("ERROR CHECK USER");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }

  checkIfUserHasJoined() {
    return new Promise((resolve, reject) => {
      this.tabsService.checkUsersInEvent(this.upcomingEvent["id"])
      .then(data => {
        this.usersArray = data;
        for(let user of this.usersArray) { 
          if(user["id"]==this.currentUser["id"]){
            this.isUserJoined = true;
          }
        }
        resolve(true);
        // this.checkEventInfo();
      },error => {
        reject(false);
      });
    });
  }

  getPeopleInEvents() {
    return new Promise((resolve, reject) => {
      this.tabsService.getParticipants(this.upcomingEvent["id"])
      .then(data => {
        this.peopleData = data;
        this.peopleArray = [];
        for(let people of this.peopleData) { 
          this.peopleArray.push({
            id: people.id,
            fname: people.fname,
            lname: people.lname,
            email: people.email,
            location: people.location,
            profile_pic: this.restapiService.ipAddress+'/user_image/'+people.profile_pic,
            cover_pic: this.restapiService.ipAddress+'/user_image/'+people.cover_pic,
            event_id: people.event_id
          });
        }
        resolve(true);
      },error => {
        reject(false);
      });
    });
  }

  checkEventInfo() {
    return new Promise((resolve, reject) => {
      this.tabsService.checkEventInformation(this.upcomingEvent["id"])
      .then(data => {
        this.eventInfo = data;
        if(this.eventInfo["user_id"]==this.currentUser["id"]){
          this.isUserHost = true;
        }
        resolve(true);
        console.log("IS HOST: " + this.isUserHost);
      },error => {
        reject(false);
      });
    });
  }

  joinEvent() {
    this.hours = new Date().getHours(); this.minutes = new Date().getMinutes();
    this.year = new Date().getFullYear(); this.month = new Date().getMonth(); this.date = new Date().getDate();
    let fullSQLDate = this.year+"-"+this.month+"-"+this.date;
    let timeSQL = this.hours+":"+(this.minutes<10?'0':'')+this.minutes;
    let timeCreated = new Date().getTime();

    this.showLoading("Joining event..");

    this.tabsService.joinEventPost(this.currentUser["id"], this.upcomingEvent["id"])
    .then(data => {
      // console.log(JSON.stringify(data));
      // this.loading.dismiss();
      this.tabsService.saveUserActivities(this.currentUser["id"], this.upcomingEvent["id"], this.upcomingEvent["title"], "joined", fullSQLDate, timeSQL, timeCreated)
      .then(data => {
        this.isUserJoined = true;
        let param = { 'isChange': true };
        this.events.publish('pageChange', param);
        this.events.publish('activityChange', param);

        this.zone.run(() => {
          console.log('force update the screen');
          this.getPeopleInEvents();
        });
      }, error => {
        this.showAlertError();
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
      this.userActivity = "removed"
      this.showAlertConfirm("Are you sure you want to cancel this event? This will remove the event");
    }else{
      // NOT OWNER
      this.ownerStatus = "not_owner";
      this.userActivity = "cancelled joining"
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
    this.hours = new Date().getHours(); this.minutes = new Date().getMinutes();
    this.year = new Date().getFullYear(); this.month = new Date().getMonth(); this.date = new Date().getDate();
    let fullSQLDate = this.year+"-"+this.month+"-"+this.date;
    let timeSQL = this.hours+":"+(this.minutes<10?'0':'')+this.minutes;
    let timeCreated = new Date().getTime();

    this.showLoading("Cancel joining event..");

    this.tabsService.cancelJoinEvent(this.currentUser["id"], this.upcomingEvent["id"], this.upcomingEvent["user_id"])
    .then(data => {
      // console.log(JSON.stringify(data));

      this.tabsService.saveUserActivities(this.currentUser["id"], this.upcomingEvent["id"], this.upcomingEvent["title"], this.userActivity, fullSQLDate, timeSQL, timeCreated)
      .then(data => {
        this.isUserJoined = false;
        let param = { 'isChange': true };
        this.events.publish('pageChange', param);
        this.events.publish('activityChange', param);

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
        this.showAlertError();
      });
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
    this.restapiService.getOneUserInfo(this.upcomingEvent["user_id"])
    .then(data => {
      this.ownerProfile = data;
      // console.log("data: " + this.ownerProfile["fname"]);
      this.navCtrl.push(UserProfilePage, { userProfile: this.ownerProfile });
    });
  }

  joinedPeople() {
    console.log("Hey clicked joined people");
    this.navCtrl.push(UserListPage, { peopleArray: this.peopleArray, title: "Going" } );
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
