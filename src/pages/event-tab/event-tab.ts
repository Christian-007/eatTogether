import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { EventDetailsPage } from '../event-details/event-details';

/**
 * Generated class for the EventTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-tab',
  templateUrl: 'event-tab.html',
})
export class EventTabPage {
  currentUser: any;
  searchCity: string;
  loading: Loading;
  eventsData: any; eventsArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public tabsService: TabsServiceProvider, public restapiService: RestapiserviceProvider) {
    console.log("HELLO WORLD".toLowerCase());
    this.currentUser = this.restapiService.getUserInfo();
    this.searchCity = this.currentUser["location"];
    this.searchEventsByCity();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventTabPage');
  }

  removeText() {
    this.searchCity = "";
  }

  searchEvent() {
    console.log(this.searchCity);
  }

  tapEvent(upcomingEvent) {
    console.log("Tapped");
    this.navCtrl.push(EventDetailsPage, { upcomingEvent: upcomingEvent });
  }

  searchEventsByCity() {
    this.showLoading();

    this.tabsService.getEventsByCity(this.currentUser["location"])
    .then(data => {
      this.eventsData = data;
      console.log("DATA: " + JSON.stringify(this.eventsData));

      this.eventsArray = [];
      for(let event of this.eventsData) { 
        this.eventsArray.push({
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
