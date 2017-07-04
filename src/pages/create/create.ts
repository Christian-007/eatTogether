import { Component} from '@angular/core';
import { IonicPage, Events, ViewController, NavController, NavParams, ActionSheetController, ToastController, Platform, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { TabsServiceProvider } from '../../providers/tabs-service/tabs-service';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';
import { SearchLocationPage } from '../search-location/search-location';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { googlemaps } from 'googlemaps';

/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var cordova: any;
// declare var google: any;

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  title: string; description: string;
  loc: string; type: string = "public";
  city: string;
  startdate: any; enddate: any;
  starttime: any; endtime: any; user_id: any;
  loading: Loading; alert: Alert;
  eventTypeOptions: { title: string };
  lastImage: string = null;

  constructor(public navCtrl: NavController, public events: Events, public viewCtrl: ViewController, public navParams: NavParams, public tabsService: TabsServiceProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public restapiService: RestapiserviceProvider, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform) {
    let currentUser = this.restapiService.getUserInfo();
    this.user_id = currentUser["id"];
    this.eventTypeOptions = {
      title: 'Event Type'
    };
    this.loc = "Search for location";
    this.events.subscribe('searchLocation', (data) => {
      // console.log("data: " + data["location"]);
      this.city = data["city"];
      this.loc = data["location"];
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    // this.startdate = new Date().toISOString();
    // this.enddate = new Date().toISOString();
  }

  searchLocation() {
    this.navCtrl.push(SearchLocationPage);
  }

  dismissModal() {
    this.restapiService.param = "Hello";
    this.events.unsubscribe('searchLocation');
    this.viewCtrl.dismiss();
    // this.navCtrl.pop();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public getImgPath(img) {
    if (img === null) {
      return '';
    } else {
      return 'url(' + cordova.file.dataDirectory + img + ')';
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "https://restful-api-dissertation.herokuapp.com/img_upload";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    console.log("targetPath: " + targetPath);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: TransferObject = this.transfer.create();
   
    // this.loading = this.loadingCtrl.create({
    //   content: 'Uploading...',
    // });
    // this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, this.restapiService.ipAddress+"/img_upload", options).then(data => {
      // this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      // this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

  createEvent() {
    console.log(this.title);
    console.log(this.description);
    console.log(this.loc);
    console.log(this.city);
    console.log(this.type);
    console.log(this.startdate);
    console.log(this.enddate);
    console.log(this.starttime);
    console.log(this.lastImage);
    console.log(this.endtime); console.log(this.user_id);

    this.showLoading();
    this.uploadImage();

    // console.log(this.fname); console.log(this.lname); console.log(this.email); console.log(this.password);
    this.tabsService.createEventPost(this.title, this.description, this.loc, this.city, this.lastImage, this.startdate, this.starttime, this.enddate, this.endtime, this.type, this.user_id)
    .then(data => {
      console.log(JSON.stringify(data));
      this.loading.dismiss();
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.loading.dismiss();
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
