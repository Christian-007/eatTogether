import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { UserListPage } from '../../pages/user-list/user-list';

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

  logoutPage() {
    this.restapiService.logout();
    this.events.unsubscribe('pageChange');
    this.navCtrl.parent.parent.pop();
  }
}
