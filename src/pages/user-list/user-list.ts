import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { UserProfilePage } from '../../pages/user-profile/user-profile';

/**
 * Generated class for the UserListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  peopleArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: RestapiserviceProvider) {
    this.peopleArray = navParams.data.peopleArray;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }

  userProfile(user) {
    this.navCtrl.push(UserProfilePage, { userProfile: user });
  }

}
