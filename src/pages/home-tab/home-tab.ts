import { Component, NgZone } from '@angular/core';
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
    private alertCtrl: AlertController,
    private zone: NgZone
  ) {
    this.currentUser = this.restapiService.getUserInfo();
    this.currentUserID = this.currentUser["id"];
    this.showLoading();
    this.getUpcomingEvents(); // this.getMyEvents();

    this.events.subscribe('pageChange',
    (data) => {
      console.log("HOMETAB data: " + data["isChange"]);
      this.getUpcomingEvents();
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
        // Refresh page with new data
        this.showLoading();
        this.getUpcomingEvents();
      }
    });
    modal.present();
  }

  getUpcomingEvents() {
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
          enddate: event.enddate,
          type: event.type,
          user_id: event.user_id,
          user_fname: event.fname,
          user_lname: event.lname
        });
      }
      this.countMyEvent();

      if(this.loading!==null){
        this.loading.dismiss();
      }
    });
  }

  countMyEvent() {
    this.myEventCount = 0;
    for(let i=0; i<this.upcomingEventsArray.length; i++){
      if(this.upcomingEventsArray[i]["user_id"]==this.currentUserID)
        this.myEventCount += 1;
    }
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
        city: event.city,
        imgName: this.restapiService.ipAddress+'/image/'+event.imgName,
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
  }

  tapEvent(upcomingEvent) {
    console.log("Tapped");
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
