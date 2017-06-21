import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  title: string; description: string;
  loc: string; type: string;
  startdate: any; enddate: any;
  starttime: any; endtime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    // this.startdate = new Date().toISOString();
    // this.enddate = new Date().toISOString();
  }

  dismissModal() {
    this.navCtrl.pop();
  }

  createEvent() {
    console.log(this.title);
    console.log(this.description);
    console.log(this.loc);
    console.log(this.type);
    console.log(this.startdate);
    console.log(this.enddate);
    console.log(this.starttime);
    console.log(this.endtime);
  }

}
