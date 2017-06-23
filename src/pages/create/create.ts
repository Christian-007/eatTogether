import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

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
  starttime: any; endtime: any; user_id: any;
  loading: Loading; alert: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tabsService: TabsServiceProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public restapiService: RestapiserviceProvider) {
    let currentUser = this.restapiService.getUserInfo();
    this.user_id = currentUser["id"];
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
    console.log(this.endtime); console.log(this.user_id);

    this.showLoading();

    // console.log(this.fname); console.log(this.lname); console.log(this.email); console.log(this.password);
    this.tabsService.createEventPost(this.title, this.description, this.loc, this.startdate, this.starttime, this.enddate, this.endtime, this.type, this.user_id)
    .then(data => {
      console.log(JSON.stringify(data));

    }, error => {
      console.log(JSON.stringify(error.json()));
      this.showAlertError();
    });
    this.loading.dismiss();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Creating events...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showAlertError() {
    this.alert = this.alertCtrl.create({
        title: "Create Event ERROR",
        subTitle: "Error occurred",
        buttons: ['CLOSE']
    });
    this.alert.present();
  }

}
