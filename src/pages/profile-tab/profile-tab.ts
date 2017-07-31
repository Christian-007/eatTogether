import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { UserListPage } from '../../pages/user-list/user-list';
import { EventDetailsPage } from '../event-details/event-details';

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
  location: string; profile_pic: string = null;
  cover_pic: string = null;
  currentUser: any;
  peopleData: any; peopleArray: any;
  activityData: any; activityArray: any;

  constructor(
    public navCtrl: NavController, 
    public tabsService: TabsServiceProvider, 
    public events: Events, 
    public navParams: NavParams, 
    public restapiService: RestapiserviceProvider, 
    public modalCtrl: ModalController
  ) {
    this.currentUser = this.restapiService.getUserInfo();
    this.id = this.currentUser["id"];
    this.fname = this.currentUser["fname"]; this.lname = this.currentUser["lname"];
    this.email = this.currentUser["email"]; this.location = this.currentUser["location"];
    this.profile_pic = this.restapiService.ipAddress+'/user_image/'+this.currentUser["profile_pic"];
    if(this.currentUser["cover_pic"]!==null)
      this.cover_pic = this.restapiService.ipAddress+'/user_image/'+this.currentUser["cover_pic"];

    // let hours = new Date().getHours();
    // let minutes = new Date().getMinutes();
    // let year = new Date().getFullYear();
    // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let month = new Date().getMonth();
    // let date = new Date().getDate();
    // let fullSQLDate = year+"-"+month+"-"+date;
    // let time = new Date().getTime();
    // console.log("TIME: " + hours + ":" + minutes);
    // console.log("DATE: " + date + " " + monthNames[month] + ", " + year);
    // console.log("SQL DATE: " + fullSQLDate);
    this.getActivities();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileTabPage');
  }

  goToEdit() {
    let modal = this.modalCtrl.create(EditProfilePage, { currentUser: this.currentUser });
    modal.onDidDismiss(data => {
      console.log(data);
      if(data["navigate"]==="logout"){
        this.logoutPage();
      }
    });
    modal.present();
  }

  starPeople() {
    this.tabsService.getStarPeople(this.id)
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
      this.navCtrl.push(UserListPage, { peopleArray: this.peopleArray, title: "Star People" } );
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
          activityType: activity.activityType,
          date: activity.date,
          time: activity.time,
          timeCreated: activity.timeCreated,
          title: activity.title,
          description: activity.description,
          location: activity.location,
          city: activity.city,
          imgName: this.restapiService.ipAddress+'/image/'+activity.imgName,
          starttime: activity.starttime,
          startdate: activity.startdate,
          endtime: activity.endtime,
          type: activity.type,
          event_user_id: activity.activity_user_id,
          user_fname: activity.fname,
          user_lname: activity.lname,
          user_profile_pic: this.restapiService.ipAddress+'/user_image/'+activity.profile_pic
        });
      }
    });
  }

  tapEvent(activity) {
    this.navCtrl.push(EventDetailsPage, { upcomingEvent: activity });
  }

  logoutPage() {
    this.restapiService.logout();
    this.events.unsubscribe('pageChange');
    this.navCtrl.parent.parent.pop();
  }
}
