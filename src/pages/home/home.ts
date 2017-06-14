import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any;
  email: string; password: string;

  constructor(public navCtrl: NavController, public restapiService: RestapiserviceProvider, public http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    // this.restapiservice.load().then(data => this.rest = data);
    // this.getData();
    this.http = http;
    this.navCtrl = navCtrl;
  }

  signupPage() {
  	this.navCtrl.push(SignupPage);
  }

  getData() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.restapiService.getData()
    .then(data => {
      this.users = data;
      console.log(JSON.stringify(data));

      /*let dataList;
      for(let i = 0; i < data.length; ++i) { 
        dataList = data[i].fname;
        console.log(dataList);
      }*/

      let alert = this.alertCtrl.create({
          title: "GET Request",
          subTitle: data[0].fname,
          buttons: ['Close']
      });
      loader.dismiss();
      alert.present();
    });
  }

  loginUser() {
    // console.log(this.email); console.log(this.password);

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.restapiService.getUserLogin(this.email,this.password)
    .then(data => {
      // this.users = data;
      console.log(data);
      if(data == true){
        loader.dismiss();
        console.log("Logged in successfully!");
      }else {
        console.log("Wrong password or email");
        let alert = this.alertCtrl.create({
            title: "Login Error",
            subTitle: "Wrong username or password",
            buttons: ['Close']
        });
        loader.dismiss();
        alert.present();
      }

    }, error => {
      console.log(JSON.stringify(error.json()));
    });
    
  }
  
}
