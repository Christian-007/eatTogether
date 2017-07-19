import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

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
  currentUser: any;
  fname: string; lname: string;
  email: string; id: string;
  location: string; profile_pic: string = null;
  cover_pic: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: RestapiserviceProvider) {
    this.currentUser = navParams.data.userProfile;
    this.id = this.currentUser["id"];
    this.fname = this.currentUser["fname"];
    this.lname = this.currentUser["lname"];
    this.email = this.currentUser["email"];
    this.location = this.currentUser["location"];
    if(this.currentUser["profile_pic"].indexOf(this.restapiService.ipAddress+'/user_image/') === -1) {
      this.profile_pic = this.restapiService.ipAddress+'/user_image/' + this.currentUser["profile_pic"];
    }else{
      this.profile_pic = this.currentUser["profile_pic"];
    }
    if(this.currentUser["cover_pic"].indexOf(this.restapiService.ipAddress+'/user_image/') === -1) {
      this.cover_pic = this.restapiService.ipAddress+'/user_image/' + this.currentUser["cover_pic"];
    }else{
      this.cover_pic = this.currentUser["cover_pic"];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

}
