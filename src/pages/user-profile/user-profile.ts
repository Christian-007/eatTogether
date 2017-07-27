import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Alert } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';

/**
 * Generated class for the UserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  currentUser: any; profileUser: any;
  fname: string; lname: string;
  email: string; id: string;
  location: string; profile_pic: string = null;
  cover_pic: string = null;
  alert: Alert; isStarred = false; isOwner = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restapiService: RestapiserviceProvider,
    public tabsService: TabsServiceProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.profileUser = navParams.data.userProfile;
    this.id = this.profileUser["id"];
    this.fname = this.profileUser["fname"];
    this.lname = this.profileUser["lname"];
    this.email = this.profileUser["email"];
    this.location = this.profileUser["location"];
    if(this.profileUser["profile_pic"].indexOf(this.restapiService.ipAddress+'/user_image/') === -1) {
      this.profile_pic = this.restapiService.ipAddress+'/user_image/' + this.profileUser["profile_pic"];
    }else{
      this.profile_pic = this.profileUser["profile_pic"];
    }
    if(this.profileUser["cover_pic"].indexOf(this.restapiService.ipAddress+'/user_image/') === -1) {
      this.cover_pic = this.restapiService.ipAddress+'/user_image/' + this.profileUser["cover_pic"];
    }else{
      this.cover_pic = this.profileUser["cover_pic"];
    }

    this.currentUser = this.restapiService.getUserInfo();
    if(this.currentUser["id"]===this.profileUser["id"]){
      this.isOwner = true;
    }else {
      this.isOwner = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    this.checkStars();
  }

  checkStars() {
    this.tabsService.checkStars(this.currentUser["id"], this.id).then(data => {
      if (data) {
        if(data["status"]){
          this.isStarred = true;
        }else {
          this.isStarred = false;
        }
      }else {
        console.log(data);
        this.presentToast('Error Occurred.');
      }
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.presentToast('Error Occurred.');
    });
  }

  star() {
    this.tabsService.starPerson(this.currentUser["id"], this.id).then(data => {
      if (data) {
        console.log(data);
        this.showAlert();
        this.isStarred = true;
        // this.presentToast('Successfully changed your password');
      }else {
        console.log(data);
        this.presentToast('Error Occurred.');
      }
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.presentToast('Error Occurred.');
    });
  }

  unstar() {
    this.tabsService.unstarPerson(this.currentUser["id"], this.id).then(data => {
      if (data) {
        console.log(data);
        this.isStarred = false;
        this.presentToast("Successfully unstarred") ;
      }else {
        console.log(data);
        this.presentToast('Error Occurred.');
      }
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.presentToast('Error Occurred.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  showAlert() {
    this.alert = this.alertCtrl.create({
      title: "Successfully starred a person!",
      subTitle: "You can now see the starred people events under recommendation section in " +
      "Discover tab page.",
      buttons: ['OK']
    });
    this.alert.present();
  }

}
