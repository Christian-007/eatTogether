import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { EventDetailsPage } from '../event-details/event-details';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

/**
 * Generated class for the RecommendedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recommended',
  templateUrl: 'recommended.html',
})
export class RecommendedPage {
  currentUser: any;
  recommendationData: any; recommendationArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public tabsService: TabsServiceProvider, public restapiService: RestapiserviceProvider) {
    this.currentUser = this.restapiService.getUserInfo();
    this.getRecommendations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendedPage');
  }

  getRecommendations(){
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
          type: recommendation.type,
          user_id: recommendation.user_id,
          user_fname: recommendation.fname,
          user_lname: recommendation.lname,
          user_profile_pic: this.restapiService.ipAddress+'/user_image/'+recommendation.profile_pic
        });
      }
    }, error => {
      console.log("ERROR OCCURRED");
    });
  }

  tapEvent(recommended) {
    this.navCtrl.push(EventDetailsPage, { upcomingEvent: recommended });
  }

}
