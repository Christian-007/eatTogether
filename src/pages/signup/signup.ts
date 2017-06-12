import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { SignupServiceProvider } from '../../providers/signup-service/signup-service';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  users: any;
  user = {};
  fname: string; lname: string; email: string; 
  loc: string; password: string; confpassword: string;

  constructor(public navCtrl: NavController, public signupService: SignupServiceProvider, public loadingCtrl: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  sendPostData() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    // console.log(this.fname); console.log(this.lname); console.log(this.email); console.log(this.password);
    this.signupService.signupPost(this.fname,this.lname,this.email,this.loc,this.password)
    .then(data => {
      this.users = data;
      console.log(JSON.stringify(data));

    }, error => {
      console.log(JSON.stringify(error.json()));
    });
    loader.dismiss();
  }

}
