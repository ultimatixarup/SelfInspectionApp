import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

import { AdddataPage } from '../adddata/adddata';

import {FindingsearchPage } from '../findingsearch/findingsearch';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'

import { InspectionPage } from '../inspection/inspection';
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


licensePlate:any;
state:any;
odoReading:any;
make:any;
model:any;
year:any;
 
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
vin:any;
inspectorId:any;

inspectionId : any;

insepction: any;

inspectiondata:any;
odometer:any;

 items: Array<{name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
    this.insepction = {id:'',year:'',make:'',model:'',vin:'',inspectorId:'',licensePlateNumber:'',licensePlateState:'',odometer:'',createDate:'',defaultPhotoId:'',findings:[],photos:[]};
    this.image1 = "assets/imgs/camera.png";
    this.image2 = "assets/imgs/camera.png";
    this.image3 = "assets/imgs/camera.png";
    this.image4 = "assets/imgs/camera.png";
    this.inspectorId = window.localStorage.getItem('INSPECTOR');
    this.vin = this.navParams.get("vin");
    this.year = this.navParams.get("year");
    this.make = this.navParams.get("make");
    this.model = this.navParams.get("model");
    this.type = navParams.get('type');
  //  alert(this.type);
    this.header = this.type;
    this.inspectiondata = this.navParams.get("data");
    if(this.inspectiondata){
        this.vin = this.inspectiondata.vin;
        this.year = this.inspectiondata.year;
        this.make = this.inspectiondata.make;
        this.model = this.inspectiondata.model;
        this.licensePlate = this.inspectiondata.licensePlateNumber;
        this.state = this.inspectiondata.licensePlateState;
        this.odometer = this.inspectiondata.odometer;
        this.inspectionId = this.inspectiondata.id;
    }
  
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

      if(this.source=='1'){
       this.navCtrl.push(AdddataPage,{'type':this.source,'image':"http://www.iihs.org/media/5a157607-944d-4b7b-a05e-4363e64494ee/2Cambw/Status%20Report/42-08/lex.jpg"});
       return;
      }
     
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
    
    //alert(JSON.parse(data.response).url+" Uploaded Successfully");
    /*if(this.source=="1"){
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
    */
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
    this.navCtrl.push(AdddataPage,{'type':this.source,'image':JSON.parse(data.response).url});
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
  
  addFinding(){
      alert(this.inspectiondata.id);
      this.navCtrl.push(AdddataPage , {itemdata: this.inspectiondata,'image':"http://www.iihs.org/media/5a157607-944d-4b7b-a05e-4363e64494ee/2Cambw/Status%20Report/42-08/lex.jpg"});

  }

  
  saveInspection(vin,inspectorId){
  
    if(this.licensePlate == ""){
      this.presentToast("Please enter License Plate");
      return;
    } else if(this.state == ""){
      this.presentToast("Please enter License State");
      return;
    } else if(this.odoReading == ""){
      this.presentToast("Please enter Odometer reading");
    }
  

    let insepctioninput = {year:this.year,make:this.make,model:this.model,vin:this.vin,inspectorId:this.inspectorId,licensePlateNumber:this.licensePlate,licensePlateState:this.state,odometer:this.odometer,createDate:'',defaultPhotoId:'NA'};
    this.insepction.inspectorId = window.localStorage.getItem("INSPECTOR");

  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
  
    let inspectionEndpoint = AppSettingsComponent.INSPECTION_SERVICE;
    /*if(this.inspectionId){
        inspectionEndpoint = AppSettingsComponent.INSPECTION_SERVICE + "/" + this.inspectionId;
    }*/
  
  
    this.http.post(inspectionEndpoint,insepctioninput).subscribe(resp => {
                                     // alert(resp['_body']);  
                                     //alert(resp['_body']); 
                                     let newinspection = JSON.parse(resp['_body']);
        
        loader.dismiss();
        this.navCtrl.push(InspectionPage,{data:newinspection});
    },
     err => { 
                loader.dismiss();
                alert(err);
            }
    
    
    
    
    );
  }
    
    
    listFindings(){

        this.navCtrl.push(FindingsearchPage, {id:this.inspectiondata.id,itemdata : this.inspectiondata});
    }


  }




