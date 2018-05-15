import { Component } from '@angular/core';

import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { AppSettingsComponent } from '../app-settings/app-settings'
/**
 * Generated class for the ImageTakerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-taker',
  templateUrl: 'image-taker.html'
})
export class ImageTakerComponent {

  text: string;
  imageURI:any;
  fileName:any;

   constructor(public http:Http, private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
    console.log('Hello ImageTakerComponent Component');
    this.text = 'Hello World';
  }
  
  public addImage() {
    
     
     /*const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        
        mediaType: this.camera.MediaType.PICTURE
      }*/
      
      
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 450,
        targetHeight: 450,
        mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options).then((imageData) => {
      
        this.imageURI = imageData;
        this.fileName = this.imageURI.split("/")[this.imageURI.split("/").length-1];
        return this.uploadFile();
      }, (err) => {
        console.log(err);
        this.presentToast(err);
      });
}

uploadFile() {
 
 

  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  

  fileTransfer.upload(this.imageURI, AppSettingsComponent.MEDIA_ENDPOINT)
    .then((data) => {
    console.log(data);
    
    
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
    return data;
  }, (err) => {
    alert(err);
    loader.dismiss();
    this.presentToast(err);
  });
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
