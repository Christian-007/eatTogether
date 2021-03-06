import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;
  users: any;
  email: string; password: string;
  title: string = "My Page";

  constructor(public navCtrl: NavController, public restapiService: RestapiserviceProvider, public http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.http = http;
    this.navCtrl = navCtrl;
  }

  signupPage() {
  	this.navCtrl.push(SignupPage);
  }

  getTitle() {
    return this.title;
  }

  getData() {
    this.showLoading();

    this.restapiService.getData()
    .then(data => {
      this.users = data;
      console.log(JSON.stringify(data));
      
      this.loading.dismiss();
    });
  }

  loginUser() {
    // console.log(this.email); console.log(this.password);
    this.showLoading();

    this.restapiService.getUserLogin(this.email,this.password)
    .then(data => {
      if(data != false){
        console.log("Logged in successfully!");
        this.navCtrl.push(TabsPage);
      }else {
        console.log("Wrong password or email");
        let alert = this.alertCtrl.create({
            title: "Login Error",
            subTitle: "Wrong username or password",
            buttons: ['Close']
        });
        this.loading.dismiss();
        alert.present();
      }

    }, error => {
      console.log(JSON.stringify(error.json()));
    });
    
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
}
