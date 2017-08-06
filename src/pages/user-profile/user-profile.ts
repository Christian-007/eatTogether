import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Alert } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { EventDetailsPage } from '../event-details/event-details';

/**
 * Generated class for the UserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  currentUser: any; profileUser: any;
  fname: string; lname: string;
  email: string; id: string;
  location: string; profile_pic: string = null;
  cover_pic: string = null;
  alert: Alert; isStarred = false; isOwner = false;
  activityData: any; activityArray: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restapiService: RestapiserviceProvider,
    public tabsService: TabsServiceProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.profileUser = navParams.data.userProfile;
    this.id = this.profileUser["id"];
    this.fname = this.profileUser["fname"];
    this.lname = this.profileUser["lname"];
    this.email = this.profileUser["email"];
    this.location = this.profileUser["location"];
    if(this.profileUser["profile_pic"].indexOf(this.restapiService.ipAddress+'/user_image/') === -1) {
      this.profile_pic = this.restapiService.ipAddress+'/user_image/' + this.profileUser["profile_pic"];
    }else{
      this.profile_pic = this.profileUser["profile_pic"];
    }
    if(this.profileUser["cover_pic"].indexOf(this.restapiService.ipAddress+'/user_image/') === -1) {
      this.cover_pic = this.restapiService.ipAddress+'/user_image/' + this.profileUser["cover_pic"];
    }else{
      this.cover_pic = this.profileUser["cover_pic"];
    }

    this.getActivities();

    this.currentUser = this.restapiService.getUserInfo();
    if(this.currentUser["id"]===this.profileUser["id"]){
      this.isOwner = true;
    }else {
      this.isOwner = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    this.checkStars();
  }

  checkStars() {
    this.tabsService.checkStars(this.currentUser["id"], this.id).then(data => {
      if (data) {
        if(data["status"]){
          this.isStarred = true;
        }else {
          this.isStarred = false;
        }
      }else {
        console.log(data);
        this.presentToast('Error Occurred.');
      }
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.presentToast('Error Occurred.');
    });
  }

  star() {
    this.tabsService.starPerson(this.currentUser["id"], this.id).then(data => {
      if (data) {
        console.log(data);
        this.showAlert();
        this.isStarred = true;
        // this.presentToast('Successfully changed your password');
      }else {
        console.log(data);
        this.presentToast('Error Occurred.');
      }
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.presentToast('Error Occurred.');
    });
  }

  unstar() {
    this.tabsService.unstarPerson(this.currentUser["id"], this.id).then(data => {
      if (data) {
        console.log(data);
        this.isStarred = false;
        this.presentToast("Successfully unstarred") ;
      }else {
        console.log(data);
        this.presentToast('Error Occurred.');
      }
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.presentToast('Error Occurred.');
    });
  }
  
  getActivities() {
    this.tabsService.getUserActivities(this.id)
    .then(data => {
      this.activityData = data;
      this.activityArray = [];
      for(let activity of this.activityData) { 
        this.activityArray.push({
          activity_id: activity.id,
          activity_user_id: activity.activity_user_id,
          id: activity.event_id,
          event_title: activity.event_title,
          activityType: activity.activityType,
          date: activity.date,
          time: activity.time,
          timeCreated: activity.timeCreated
        });
      }
    });
  }

  tapEvent(activity) {
    let eventDetails;
    console.log("activity: " + JSON.stringify(activity));
    this.tabsService.checkEventInformation(activity["id"])
    .then(data => {
      eventDetails = {
        "id": data["event_id"],
        "title": data["title"],
        "description": data["description"],
        "location": data["location"],
        "city": data["city"],
        "imgName": this.restapiService.ipAddress+'/image/'+data["imgName"],
        "starttime": data["starttime"],
        "startdate": data["startdate"],
        "endtime": data["endtime"],
        "type": data["type"],
        "user_id": data["user_id"],
        "user_fname": data["fname"],
        "user_lname": data["lname"],
        "user_profile_pic": this.restapiService.ipAddress+'/user_image/'+data["profile_pic"]
      };
      this.navCtrl.push(EventDetailsPage, { upcomingEvent: eventDetails });
    },error => {
      this.presentToast('This event is not available.');
      console.log("ERROR");
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  showAlert() {
    this.alert = this.alertCtrl.create({
      title: "Successfully starred a person!",
      subTitle: "You can now see the starred people events under recommendation section in " +
      "Discover tab page.",
      buttons: ['OK']
    });
    this.alert.present();
  }

}
