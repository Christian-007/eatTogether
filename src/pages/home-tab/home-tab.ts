import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, ModalController, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { EventDetailsPage } from '../event-details/event-details';

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
  paramReceived: any;
  myEventCount: number = 0;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restapiService: RestapiserviceProvider,
    public tabsService: TabsServiceProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.currentUser = this.restapiService.getUserInfo();
    this.currentUserID = this.currentUser["id"];
    this.showLoading();
    this.getUpcomingEvents().then(data => {
      this.countMyEvent();
      if(this.loading!==null){
        this.loading.dismiss();
      }
    }, error => {
      console.log("ERROR GETTING EVENTS");
    });

    this.events.subscribe('pageChange',
    (data) => {
      console.log("HOMETAB data: " + data["isChange"]);
      this.getUpcomingEvents().then(data => {
        this.countMyEvent();
      }, error => {
        console.log("ERROR GETTING EVENTS");
      });
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabPage');
  }

  goToCreateEventPage() {
    let modal = this.modalCtrl.create(CreatePage);
    modal.onDidDismiss(data => {
      console.log(data);
      if(data["hasData"]){
        console.log("REFRESH DATAAA");
        // Refresh page with new data
        this.showLoading();
        this.getUpcomingEvents().then(data => {
          this.loading.dismiss().then(() => {
            this.countMyEvent();
          });
        });
      }
    });
    modal.present();
  }

  getUpcomingEvents() {
    return new Promise((resolve, reject) => {
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
            city: event.city,
            imgName: this.restapiService.ipAddress+'/image/'+event.imgName,
            starttime: event.starttime,
            startdate: event.startdate,
            endtime: event.endtime,
            type: event.type,
            user_id: event.user_id,
            user_fname: event.fname,
            user_lname: event.lname,
            user_profile_pic: this.restapiService.ipAddress+'/user_image/'+event.profile_pic
          });
        }
        resolve(true);
      }, err => {
        reject(false);
        console.log('Error while creating event.');
      });
    });
  }

  countMyEvent() {
    this.myEventCount = 0;
    for(let i=0; i<this.upcomingEventsArray.length; i++){
      if(this.upcomingEventsArray[i]["user_id"]==this.currentUserID)
        this.myEventCount += 1;
    }
  }

  tapEvent(upcomingEvent) {
    this.navCtrl.push(EventDetailsPage, { upcomingEvent: upcomingEvent });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Getting all events...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
