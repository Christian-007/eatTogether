import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';

/**
 * Generated class for the HomeTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab.html',
})
export class HomeTabPage {
  loading: Loading; alert: Alert;
  eventsData: any; eventsArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public restapiService: RestapiserviceProvider, public tabsService: TabsServiceProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    let currentUser = this.restapiService.getUserInfo();
    // console.log("currentUser Name: " + currentUser["fname"]);

    this.getAllEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabPage');
  }

  goToCreateEventPage() {
    let modal = this.modalCtrl.create(CreatePage);
    modal.present();
  }

  getAllEvents() {
    this.showLoading();

    this.tabsService.getAllEvents()
    .then(data => {
      this.eventsData = data;

      this.eventsArray = [];
      for(let event of this.eventsData) { 
        this.eventsArray.push({
          id: event.id,
          title: event.title,
          description: event.description,
          location: event.location,
          starttime: event.starttime,
          startdate: event.startdate,
          endtime: event.endtime,
          enddate: event.enddate,
          type: event.type
        });
      }

      this.loading.dismiss();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Getting all events...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
