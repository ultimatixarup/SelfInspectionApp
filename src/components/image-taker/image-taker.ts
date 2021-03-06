import { Component } from '@angular/core';

import { Http } from '@angular/http';
import { FileTransfer, FileTransferObject,FileUploadOptions } from '@ionic-native/file-transfer';
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
  
  public addImage(src,miscinfo,callback) {
    //callback("",miscinfo);
    
     const options: CameraOptions = {
          targetWidth: 500,
          targetHeight: 500,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          sourceType: src
      };

      

      this.camera.getPicture(options).then((imageData) => {
      
        this.imageURI = imageData;
        
        this.uploadFile(callback,miscinfo);
      }, (err) => {
        alert(err);
        console.log(err);
        this.presentToast(err);
      });
      this.camera.cleanup();
      
      
      
}

uploadFile(callback,miscinfo) {
 
 

  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: 'name.jpg',
     mimeType: 'image/jpeg',
     headers: {}
     
  }
 

  fileTransfer.upload(this.imageURI, AppSettingsComponent.MEDIA_ENDPOINT,options)
    .then((data) => {
    
    
    
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
    
    callback(data,miscinfo);
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
