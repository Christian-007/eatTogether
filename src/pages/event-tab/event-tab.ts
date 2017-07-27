import { Component, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, LoadingController, Loading } from 'ionic-angular';
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
export class EventTabPage implements AfterViewInit{
  @ViewChild('slides') slides: Slides;

  currentUser: any;
  searchCity: string;
  loading: Loading; 
  recommendationData: any; recommendationArray: any[];
  eventsData: any; eventsArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public tabsService: TabsServiceProvider, public restapiService: RestapiserviceProvider) {
    console.log("HELLO WORLD".toLowerCase());
    this.currentUser = this.restapiService.getUserInfo();
    this.searchCity = this.currentUser["location"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventTabPage');
    let currentIndex = this.slides.getActiveIndex();
    console.log("INDEX: " + currentIndex);
    console.log(this.slides);
  }


  ngAfterContentInit() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("INDEX: " + currentIndex);
    // After the view is initialized, this.userProfile will be available
    // this.doRefresh(0);
  }

  ngAfterViewInit() {
    this.doRefresh(0);
    // After the view is initialized, this.userProfile will be available
    let currentIndex = this.slides.getActiveIndex();
    console.log("INDEX: " + currentIndex);
  }

  doRefresh(refresher) {
    this.searchEventsByCity().then(data => {
      if(data){
        this.tabsService.getRecommendations(this.currentUser["id"])
        .then(data => {
          this.recommendationData = data;

          this.recommendationArray = [];
          for(let recommendation of this.recommendationData) { 
            this.recommendationArray.push({
              id: recommendation.id,
              title: recommendation.title,
              description: recommendation.description,
              location: recommendation.location,
              city: recommendation.city,
              imgName: this.restapiService.ipAddress+'/image/'+recommendation.imgName,
              starttime: recommendation.starttime,
              startdate: recommendation.startdate,
              endtime: recommendation.endtime,
              enddate: recommendation.enddate,
              type: recommendation.type,
              user_id: recommendation.user_id,
              user_fname: recommendation.fname,
              user_lname: recommendation.lname,
              user_profile_pic: this.restapiService.ipAddress+'/user_image/'+recommendation.profile_pic
            });
          }

          console.log("RECOMMENDATION: " + JSON.stringify(this.recommendationData));
          if(refresher != 0)
            refresher.complete();
        }, error => {
          console.log(JSON.stringify(error.json()));
          if(refresher != 0)
            refresher.complete();
        });
      }

    }, error => {
      console.log(JSON.stringify(error.json()));
      if(refresher != 0)
        refresher.complete();
    });
  }

  removeText() {
    this.searchCity = "";
  }

  searchEvent() {
    console.log(this.searchCity);
    this.searchEventsByCity();
  }

  tapEvent(upcomingEvent) {
    console.log("Tapped");
    this.navCtrl.push(EventDetailsPage, { upcomingEvent: upcomingEvent });
  }

  searchEventsByCity() {
    return new Promise((resolve, reject) => {
      this.showLoading();

      this.tabsService.getEventsByCity(this.searchCity)
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
            user_lname: event.lname,
            user_profile_pic: this.restapiService.ipAddress+'/user_image/'+event.profile_pic
          });
        }

        this.loading.dismiss();
      });

      resolve(true);
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
