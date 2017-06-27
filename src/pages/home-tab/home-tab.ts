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
  homeSegment: string = "upcoming";
  loading: Loading; alert: Alert;
  myEventsData: any; myEventsArray: any[];
  upcomingEventsData: any; upcomingEventsArray: any[];
  currentUser: any; currentUserID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public restapiService: RestapiserviceProvider, public tabsService: TabsServiceProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.currentUser = this.restapiService.getUserInfo();
    this.currentUserID = this.currentUser["id"];
    // console.log("currentUser Name: " + currentUser["fname"]);

    this.getUpcomingEvents();
    // this.getMyEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabPage');
  }

  goToCreateEventPage() {
    let modal = this.modalCtrl.create(CreatePage);
    modal.present();
  }

  getUpcomingEvents() {
    this.showLoading();

    this.tabsService.getUpcomingEvents(this.currentUser["id"])
    .then(data => {
      this.upcomingEventsData = data;

      this.upcomingEventsArray = [];
      for(let event of this.upcomingEventsData) { 
        this.upcomingEventsArray.push({
          id: event.id,
          title: event.title,
          description: event.description,
          location: event.location,
          imgName: 'https://restful-api-dissertation.herokuapp.com/image/'+event.imgName,
          starttime: event.starttime,
          startdate: event.startdate,
          endtime: event.endtime,
          enddate: event.enddate,
          type: event.type,
          user_id: event.user_id,
          user_fname: event.fname,
          user_lname: event.lname
        });
      }

      this.loading.dismiss();
    });
  }

  getMyEvents() {
    this.myEventsArray = [];
    for(let event of this.myEventsData) { 
      if(event.user_id == this.currentUser["id"])
      this.myEventsArray.push({
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        imgName: event.imgName,
        starttime: event.starttime,
        startdate: event.startdate,
        endtime: event.endtime,
        enddate: event.enddate,
        type: event.type,
        user_id: event.user_id,
        user_fname: event.fname,
        user_lname: event.lname
      });
    }
    // this.showLoading();

    // this.tabsService.getMyEvents(this.currentUser["id"])
    // .then(data => {
    //   this.myEventsData = data;

    //   this.myEventsArray = [];
    //   for(let event of this.myEventsData) { 
    //     this.myEventsArray.push({
    //       id: event.id,
    //       title: event.title,
    //       description: event.description,
    //       location: event.location,
    //       starttime: event.starttime,
    //       startdate: event.startdate,
    //       endtime: event.endtime,
    //       enddate: event.enddate,
    //       type: event.type,
    //       user_id: event.user_id,
    //       user_fname: event.fname,
    //       user_lname: event.lname
    //     });
    //   }

    //   this.loading.dismiss();
    // });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Getting all events...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
