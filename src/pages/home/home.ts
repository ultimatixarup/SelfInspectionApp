import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

import { InspectionPage } from '../inspection/inspection';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 items: Array<{name: any,description: any}>;
 
 imageURI:any;
imageFileName:any;
fileName:any;
type:any;
vinScanned:any;

  constructor(
  public navCtrl: NavController, 
  private barcodeScanner: BarcodeScanner,
  private http: Http,
  private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
  
  

  }
  
  
  scan(){
  
   let loading = this.loadingCtrl.create({
            content: 'Please wait...'
         });
  
  loading.present();
        this.http.get('https://vehicle-service.herokuapp.com/vehicle?vin=5J6RE4H79BL013391').subscribe(resp => {
              //alert(JSON.parse(resp['_body']).Results);
              
             var results = JSON.parse(resp['_body']);
             //alert(Object.keys(results));
             
             let keys = Object.keys(results);
             
             this.items = [];
             for(var i=0;i<keys.length;i++){
                if(typeof results[keys[i]] != "object"){
                    var item = {
                        name : keys[i],
                        description: results[keys[i]]
                    };
                    this.items.push(item);
                }
             }
             this.vinScanned = true;
             loading.dismiss();
            
         
       });
  
  }
  
  
  scan1(){
   
   let loading = this.loadingCtrl.create({
            content: 'Please wait...'
         });
   
    this.barcodeScanner.scan({
                    showTorchButton:true
                }).then(barcodeData => {
        alert('Barcode data - ' + barcodeData.text);
        
       if(barcodeData.text){
        loading.present();
        this.http.get('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/'+barcodeData.text+'?format=json').subscribe(resp => {
              //alert(JSON.parse(resp['_body']).Results);
              
             var results = JSON.parse(resp['_body']).Results;
             this.items = [];
             for(var i=0;i<results.length;i++){
                var item = {
                    name : results[i].Variable,
                    description: results[i].Value
                };
                this.items.push(item);
             }
             
             loading.dismiss();
            
         
       });
       }
        
        
        
    }).catch(err => {
        console.log('Error',err);
        loading.dismiss();
    });
    
  }
  
  
  
  
  
  
  getImage() {
    
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
      
        this.imageURI = imageData;
        this.fileName = this.imageURI.split("/")[this.imageURI.split("/").length-1];
        alert(this.fileName);
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
    this.imageFileName = JSON.parse(data.response).url;
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


goToInspection(type){

    this.navCtrl.push(InspectionPage, {'type': type});


}


}
