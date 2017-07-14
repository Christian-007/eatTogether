import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  currentUser: any;
  fname: string; lname: string; 
  email: string; id: string;
  location: string; profile_pic: string;
  cover_pic: string;

  constructor(public navCtrl: NavController,  public viewCtrl: ViewController, public restapiService: RestapiserviceProvider, public navParams: NavParams) {
    this.currentUser = navParams.data.currentUser;
    this.id = this.currentUser["id"];
    this.fname = this.currentUser["fname"];
    this.lname = this.currentUser["lname"];
    this.email = this.currentUser["email"];
    this.location = this.currentUser["location"];
    this.profile_pic = this.restapiService.ipAddress+'/user_image/'+this.currentUser["profile_pic"];
    this.cover_pic = this.restapiService.ipAddress+'/user_image/'+this.currentUser["cover_pic"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveChanges() {
    this.restapiService.updateUserDetails(this.id, this.fname, this.lname)
    .then(data => {
      console.log(JSON.stringify(data));
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
