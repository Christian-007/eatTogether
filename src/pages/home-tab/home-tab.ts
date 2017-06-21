import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public restapiService: RestapiserviceProvider) {
    let currentUser = this.restapiService.getUserInfo();
    // console.log("currentUser Name: " + currentUser["fname"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabPage');
  }

  goToCreateEventPage() {
    let modal = this.modalCtrl.create(CreatePage);
    modal.present();
  }

}
