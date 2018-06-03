import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { LoadingController } from 'ionic-angular';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'


import { FindingsearchPage } from '../findingsearch/findingsearch';
import { SelectSearchable } from 'ionic-select-searchable';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

import { AidataPage } from '../aidata/aidata';


import { ImageTakerComponent } from '../../components/image-taker/image-taker';


/**
 * Generated class for the AdddataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class Port {
        
}



@IonicPage()
@Component({
  selector: 'page-adddata',
  templateUrl: 'adddata.html',
})
export class AdddataPage {

ports: Port[];
    port: Port;
  imageId:any;
  image:any;
  source:any;
  nounsData:Array<{noun:string,category:string,vsa:string,ewu:string}>;
  nouns:Array<{noun:string,category:string,vsa:string,ewu:string}>;
  locations:Array<{locationAdj:string}>;
  damages:Array<{damageClf:string}>;
  catagories:Array<{name:string}>;
  locationData:any;
  nounData:any;
  damageData:any;
  categoryData:any;
  findings:Array<{findingAdj:string}>;
  findingData:any;
  inspectionFindings:Array<{id:any,inspectionId:any,vifFindingAdj:any,vifLocationAdj:any,vifNoun:any,vifDamageClf:any}>;
  itemdata:any;
  inspectorId:any;
  inspectiondata:any;
  findingId:any;
  inspectionId:any;
  type:any;
  addimage:any;
  imageURI:any;
  nounValue:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController,public imageTaker:ImageTakerComponent) {
  
 
    this.nounsData = JSON.parse(window.localStorage.getItem("NOUNS"));
    this.ports = JSON.parse(window.localStorage.getItem("NOUNS"));
    
    this.inspectiondata = navParams.get('data');
    this.image = this.navParams.get('image');
    this.source = this.navParams.get('source');
    
    
    this.itemdata = this.navParams.get('itemdata');
    this.type=this.navParams.get('type');
    
    
    //alert(this.type);
    if(this.itemdata){
    
      this.imageURI = AppSettingsComponent.MEDIA_ENDPOINT + "/" + this.itemdata.defaultPhotoId + "/content";
      
      this.imageId = this.itemdata.defaultPhotoId;
      
      
      this.locationData = this.itemdata.vifLocationAdj;
     // this.categoryData = this.itemdata.
      this.nounData = this.itemdata.vifNoun;
      this.port = {noun:this.itemdata.vifNoun};
      
      this.findingData = this.itemdata.vifFindingAdj;
      this.damageData = this.itemdata.vifDamageClf;
      this.findingId = this.itemdata.id;
      //alert(this.itemdata);
      if(this.type == 0){
        this.findingId = this.itemdata.id;
        this.inspectionId = this.itemdata.inspection.id;
        this.addimage = true;
        
      }
       else if(this.type == 1) {
      
        this.inspectionId = this.itemdata.id;
        this.addimage = false;
        
        
        this.imageId = "";
        }
      
    }



   
    this.findings = JSON.parse(window.localStorage.getItem("FINDINGS"));
    this.catagories = [];
    for(var i=0;i<this.nounsData.length;i++){
      let found = false;
      for(var j=0;j<this.catagories.length;j++){
          let tcat = this.catagories[j];
          if(tcat.name == this.nounsData[i].category){
            found = true;
            break;
          }
      }
      if(!found){
        let cat = {name:this.nounsData[i].category};

        this.catagories.push(cat);

      }
      
      
    }
    console.log(this.catagories);
    this.locations = JSON.parse(window.localStorage.getItem("LOCATIONS"));
    //alert(window.localStorage.getItem("DAMAGES"));
    this.damages = JSON.parse(window.localStorage.getItem("DAMAGES"));
     
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdddataPage');
  }

 optionSelected() {
let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
    this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_NOUN+'?category='+this.categoryData).subscribe(resp => {
                                                                                                                  
        this.nouns = JSON.parse(resp['_body']);
        loader.dismiss();
    });


    //alert(this.categoryData);
  }


addInspection(){

    

   if(this.nounData && this.nounData === ""){
      alert("Please enter Object");
      return;
    } else if(this.findingData && this.findingData === ""){
      alert("Please enter Finding");
      return;
    } 

if( this.nounData && this.findingData ){
if(this.nounData.noun){
    this.nounValue = this.nounData.noun;
} else {
    this.nounValue = this.itemdata.vifNoun;
}



let inspectionjson = {id:this.inspectionId};
 let newfinding = {vifFindingAdj: this.findingData , vifLocationAdj: this.locationData, vifNoun: this.nounValue, vifDamageClf: this.damageData, defaultPhotoId: this.imageId?this.imageId+'':null, inspection: inspectionjson};
 
 
 let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
  
  let findingEndpoint = AppSettingsComponent.INSPECTION_FINDING;
 
  
  if(this.type == 0){
    findingEndpoint = AppSettingsComponent.INSPECTION_FINDING +'/'+this.findingId;
    this.http.patch(findingEndpoint,newfinding).subscribe(resp => {
                                     // alert(resp['_body']);  
                                     //alert(resp['_body']); 
                                    //let newinspection = JSON.parse(resp['_body']);
                                    this.type = 'update';
        
        loader.dismiss();
        this.navCtrl.push(FindingsearchPage,{id:this.inspectiondata.id,itemdata: this.inspectiondata});
    },
    
     err => { 
                loader.dismiss();
                alert(err);
            }
    
    );
    
    
    
    
    
  } else {
  
 
    this.http.post(findingEndpoint,newfinding).subscribe(resp => {
                                  
                                let newfinding = JSON.parse(resp['_body']);
                                this.type = 'update';
                                this.findingId = newfinding.id;
                                this.inspectionId = newfinding.inspection.id;
        
        loader.dismiss();
        this.navCtrl.push(FindingsearchPage,{id:this.inspectiondata.id,itemdata: this.inspectiondata});
    },
    
     err => { 
                loader.dismiss();
                alert(err);
            }
    
    );
 
 }
 
 //this.listFinding();
 
 } else {
 
    alert("Please enter all information");
 
 }
 }
 
 
    
    listFinding(){
        this.navCtrl.push(FindingsearchPage,{id:this.inspectiondata.id,itemdata: this.inspectiondata});
    }
  


valid(photoid){
    if(photoid){
        if(photoid === "null"){
          return false;
        }
      return true;
    } else {
      return false;
    }
    

 }
 
 gotoAi(item){
    this.navCtrl.push(AidataPage, {data:this.itemdata});
  }

addImage(src){

//this.imageId = "1423";

    
    let miscinfo = { caller: this};

this.imageTaker.addImage(src,miscinfo,function(data,miscinfo){
    let imageid = JSON.parse(data.response).id;
   
    miscinfo.caller.imageId = imageid;
         
});

}


  portChange(event: { component: SelectSearchable, value: any }) {
        console.log('port:', event.value);
        this.nounData = event.value;
    }
    
    imagePath(photoId){
        return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
      }

      gohome(){
        this.navCtrl.setRoot(InspectiondetailsPage);
      }

      process(date){
        return date.split('T')[0];
      }

}



