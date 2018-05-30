import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';

import { ToastController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

import { AdddataPage } from '../adddata/adddata';

import {FindingsearchPage } from '../findingsearch/findingsearch';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

import { InspectionPage } from '../inspection/inspection';



import { ImageTakerComponent } from '../../components/image-taker/image-taker';

import { PhotosearchPage } from '../photosearch/photosearch';



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
imageId:any;

inspectionId : any;

insepction: any;

inspectiondata:any;
odometer:any;
updateLabel:any;

vinresult:any;

inspectionupdate:any;

 items: Array<{name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
  public loadingCtrl: LoadingController,public toastCtrl:ToastController,public imageTaker:ImageTakerComponent
  ) {
    this.insepction = {id:'',year:'',make:'',model:'',vin:'',inspectorId:'',licensePlateNumber:'',licensePlateState:'',odometer:'',createDate:'',defaultPhotoId:'',findings:[],photos:[]};
     this.inspectionupdate = true;
     this.imageId=0;
    this.inspectorId = window.localStorage.getItem('INSPECTOR');
    
    this.vinresult = this.navParams.get("vinresult");
    
    this.type = navParams.get('type');
    this.inspectorId = window.localStorage.getItem("INSPECTOR");
  //  alert(this.type);
    this.header = this.type;
    this.inspectiondata = this.navParams.get("data");
    if(this.inspectiondata){
    this.inspectionupdate = true;
    this.updateLabel = "Update Inspection";
         this.imageId = this.inspectiondata.defaultPhotoId;
        this.vin = this.inspectiondata.vin;
        this.year = this.inspectiondata.year;
        this.make = this.inspectiondata.make;
        this.model = this.inspectiondata.model;
        this.licensePlate = this.inspectiondata.licensePlateNumber;
        this.state = this.inspectiondata.licensePlateState;
        this.odometer = this.inspectiondata.odometer;
        this.inspectionId = this.inspectiondata.id;
        
    } else {
        this.inspectionupdate = false;
        this.updateLabel = "Create Inspection";
        this.vin = this.vinresult.vin;
        this.year = this.vinresult.year;
        this.make = this.vinresult.make;
        this.model = this.vinresult.model;
        this.imageId="";
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
  
  saveInspection(vin,inspectorId){
  
    if(this.licensePlate && this.licensePlate === ""){
      alert("Please enter License Plate");
      return;
    } else if(this.state && this.state === ""){
      alert("Please enter License State");
      return;
    } else if(this.odoReading && this.odoReading === ""){
      alert("Please enter Odometer reading");
      return;
    } 
    
    if(this.imageId == 0){
        alert("Please select a photo");
        return;
    }
  

    let insepctioninput = {year:this.year,make:this.make,model:this.model,vin:this.vin,inspectorId:this.inspectorId,licensePlateNumber:this.licensePlate,licensePlateState:this.state,odometer:this.odometer,createDate:'',defaultPhotoId:this.imageId+''};
    this.insepction.inspectorId = window.localStorage.getItem("INSPECTOR");

  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
  
    let inspectionEndpoint = AppSettingsComponent.INSPECTION_SERVICE;
    if(this.inspectionId){
        inspectionEndpoint = AppSettingsComponent.INSPECTION_SERVICE + "/" + this.inspectionId;
         this.http.patch(inspectionEndpoint,insepctioninput).subscribe(resp => {
                                     // alert(resp['_body']);  
                                     //alert(resp['_body']); 
                                     let newinspection = JSON.parse(resp['_body']);
                                     
        
            loader.dismiss();
            
            this.navCtrl.push(InspectiondetailsPage,{data:newinspection});
        },
         err => { 
                    loader.dismiss();
                    alert(err);
                }




        );
        
        
        
        
    } else {
  
  
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
  }
    
    
    listFindings(){

        this.navCtrl.push(FindingsearchPage, {id:this.inspectiondata.id,itemdata : this.inspectiondata});
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
    this.navCtrl.push(AdddataPage , {data: this.inspectiondata,itemdata: this.inspectiondata,type:1 });
    

}

photoSearch(){
 
    this.navCtrl.push(PhotosearchPage, {data:this.inspectiondata});
 }

addImage(src){

    //this.imageId = 1;
    
    let miscinfo = { caller: this};

    this.imageTaker.addImage(src,miscinfo,function(data,miscinfo){
        let imageid = JSON.parse(data.response).id;
        //let imageid = 1;
        miscinfo.caller.imageId = imageid;
    });
}

imagePath(photoId){
        return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
}

gohome(){
  this.navCtrl.setRoot(InspectiondetailsPage);
}


}




