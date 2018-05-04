import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

 
imageURI:any;
imageFileName:any;
fileName:any;
type:any;
vinScanned:any;
header: any;
image1:string;
image2:string;
image3:string;
image4:string;
source:string;
 items: Array<{name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
  
  this.image1 = "assets/imgs/camera.png";
  this.image2 = "assets/imgs/camera.png";
  this.image3 = "assets/imgs/camera.png";
  this.image4 = "assets/imgs/camera.png";
  
  
   this.type = navParams.get('type');
 //  alert(this.type);
  this.header = this.type;
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    
    this.http.get('assets/data/inspection.json').subscribe(resp => {
             console.log(resp);
             this.buildPage(resp['_body']);
             
    });
    
    
    
    
  }
  
  buildPage(jsondata){
       this.items = [];
      // alert(this.type);
       let data = JSON.parse(jsondata)[this.type];
      // alert(data);
       for(var i=0;i<data.length;i++){
            let item ={ name: data[i], data: '' };
            this.items.push(item);
       }
       
       
       
  }
  
  
   getImage(source) {
     this.source = source;
     
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
        this.uploadFile();
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

  let options: FileUploadOptions = {
    params: { 'upload_preset': 'upsbhvp2'}
  }

  fileTransfer.upload(this.imageURI, 'https://api.cloudinary.com/v1_1/hmcvojkyu/upload', options)
    .then((data) => {
    console.log(data);
    
    alert(JSON.parse(data.response).url+" Uploaded Successfully");
    if(this.source=="1"){
        this.image1 = JSON.parse(data.response).url;
    }
     if(this.source=="2"){
        this.image2 = JSON.parse(data.response).url;
    }
     if(this.source=="3"){
        this.image3 = JSON.parse(data.response).url;
    }
     if(this.source=="4"){
        this.image4 = JSON.parse(data.response).url;
    }
    
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
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
