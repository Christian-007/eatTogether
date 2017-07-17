import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, ToastController, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  currentUser: any;
  fname: string; lname: string; 
  email: string; id: string; location: string; 
  profile_pic: string; cover_pic: string;
  profileImage: string = null; coverImage: string = null;
  changeType: string;

  constructor(
    public navCtrl: NavController,  
    public viewCtrl: ViewController, 
    public restapiService: RestapiserviceProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private camera: Camera, 
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath, 
    public toastCtrl: ToastController, 
    public platform: Platform)
  {
    this.currentUser = navParams.data.currentUser;
    this.id = this.currentUser["id"];
    this.fname = this.currentUser["fname"];
    this.lname = this.currentUser["lname"];
    this.email = this.currentUser["email"];
    this.location = this.currentUser["location"];
    this.profile_pic = this.restapiService.ipAddress+'/user_image/'+this.currentUser["profile_pic"];
    this.cover_pic = this.restapiService.ipAddress+'/user_image/'+this.currentUser["cover_pic"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  // Upload cover pic, upload profile pic, upload user details
  saveChanges() {

    // Step 1: Upload cover pic
    this.uploadImage(this.coverImage, "cover")
    .then(data => {
      if(data){

        // Step 2: Upload profile pic
        this.uploadImage(this.profileImage, "profile")
        .then(data => {
          if(data){

            // Step 3: Upload user details
            this.restapiService.updateUserDetails(this.id, this.fname, this.lname, this.email, this.location, this.coverImage, this.profileImage)
            .then(data => {
              console.log(JSON.stringify(data));
              this.presentToast('Successfully saved changes');
              this.dismiss();
            }, error => {
              console.log(JSON.stringify(error.json()));
            });

          }
        }, error => {
          console.log(JSON.stringify(error.json()));
        });

      }

    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changePassword() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Please enter your old and new password",
      inputs: [
        {
          name: 'oldpass',
          placeholder: 'Old password',
          type: 'password'
        },
        {
          name: 'newpass',
          placeholder: 'New password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: user => {
            if(user.oldpass==="" || user.newpass==="" ){
              let alert = this.alertCtrl.create({
                title: 'Empty Field',
                subTitle: 'Old and new password fields cannot be empty.',
                buttons: ['OK']
              });
              alert.present();
            }
            else {
              this.restapiService.updateUserPassword(this.id, user.oldpass, user.newpass).then(data => {
                if (data) {
                  console.log(data);
                  this.presentToast('Successfully changed your password');
                }else {
                  console.log(data);
                  let alert = this.alertCtrl.create({
                    title: 'Wrong Old Password',
                    subTitle: 'You just inputted a wrong old password!',
                    buttons: ['OK']
                  });
                  alert.present();
                }
              }, error => {
                console.log(JSON.stringify(error.json()));
              });
            }

            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  public presentActionSheet(photoType: string) {
    this.changeType = photoType; // get the picture type (cover or profile picture)

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
      if(this.changeType==='cover'){
        this.coverImage = newFileName;
      }else {
        this.profileImage = newFileName;
      }
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

  // Get the origin of image (cover or profile image)
  public uploadImage(imgType: string, type: string) {
    // Check if there is any changes to cover picture
    if(type==='cover'){
      if(this.coverImage === null) {
        return new Promise((resolve, reject) => {
          // this.presentToast("NO CHANGE COVER");
          resolve(true); // skip uploading if there is no change
        });
      }
    }else { // Check if there is any changes to profile picture
      if(this.profileImage === null) {
        return new Promise((resolve, reject) => {
          // this.presentToast("NO CHANGE PROFILE");
          resolve(true); // skip uploading if there is no change
        });
      }
    }
    
    // --- Only gets executed if there is a change to both or either profile or cover picture ---

    // Destination URL
    var url = this.restapiService.ipAddress+"/user_img_upload";
   
    // File for Upload
    var targetPath = this.pathForImage(imgType);
   
    // File name only
    var filename = imgType;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: TransferObject = this.transfer.create();

    return new Promise((resolve, reject) => {
      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        if (data) {
          this.presentToast('Image succesful uploaded.');
          resolve(data);
        }else {
          reject("ERROR");
        }
      }, err => {
        this.presentToast('Error while uploading file.');
      });
    });

  }

}
