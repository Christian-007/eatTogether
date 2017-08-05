import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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
  fname: string = ""; lname: string = ""; email: string = ""; 
  loc: string = ""; password: string = ""; confpassword: string = "";

  constructor(public navCtrl: NavController, public signupService: SignupServiceProvider,  private alertCtrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  checkFormData() {
    if(!this.fname.length || !this.lname.length || !this.loc.length || !this.email.length || !this.password.length || !this.confpassword.length){
      let alert = this.alertCtrl.create({
        title: "Empty Field",
        subTitle: "Please fill up all of the fields accordingly.",
        buttons: ['OK']
      });
      alert.present();
    }else {
      if(this.password !== this.confpassword){
        let alert = this.alertCtrl.create({
          title: "Password Error",
          subTitle: "Your confirmation password does not match with your inputted password.",
          buttons: ['OK']
        });
        alert.present();
      }else {
        this.sendPostData();
      }
    }
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
      let alert = this.alertCtrl.create({
        title: "Successfully Signed Up!",
        subTitle: "You have successfully signed up! You can now login with your email and password.",
        buttons: ['OK']
      });
      alert.present();

    }, error => {
      console.log(JSON.stringify(error.json()));
    });
    loader.dismiss();
  }

}
