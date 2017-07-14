import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { EditProfilePage } from '../edit-profile/edit-profile';

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

  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public restapiService: RestapiserviceProvider, public modalCtrl: ModalController) {
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
    // modal.onDidDismiss(data => {
    //   console.log(data);
    //   if(data["hasData"]){
    //     // Refresh page with new data
    //     this.showLoading();
    //     this.getUpcomingEvents();
    //   }
    // });
    modal.present();
  }

  logoutPage() {
    this.restapiService.logout();
    this.events.unsubscribe('pageChange');
    this.navCtrl.parent.parent.pop();
  }
}
