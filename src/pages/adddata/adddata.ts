import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { LoadingController } from 'ionic-angular';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'

import { FindingsearchPage } from '../findingsearch/findingsearch';
import { SelectSearchable } from 'ionic-select-searchable';


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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController) {
  
  
    this.nounsData = JSON.parse(window.localStorage.getItem("NOUNS"));
    this.ports = JSON.parse(window.localStorage.getItem("NOUNS"));
    
    this.inspectiondata = navParams.get('data');
    this.image = this.navParams.get('image');
    this.source = this.navParams.get('source');
    this.itemdata = this.navParams.get('itemdata');
    this.type=this.navParams.get('type');
    if(this.itemdata){
    
      this.locationData = this.itemdata.vifLocationAdj;
     // this.categoryData = this.itemdata.
      this.nounData = this.itemdata.vifNoun;
      this.port = {noun:this.itemdata.vifNoun};
      this.itemdata.vifNoun;
      this.findingData = this.itemdata.vifFindingAdj;
      this.damageData = this.itemdata.vifDamageClf;
      this.findingId = this.itemdata.id;
      //alert(this.itemdata);
      if(this.type=='update'){
        this.findingId = this.itemdata.id;
        this.inspectionId = this.itemdata.inspection.id;
      }
      if(this.type == 'new')
        this.inspectionId = this.itemdata.id;
      
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

let inspectionjson = {id:this.inspectionId};
 let newfinding = {vifFindingAdj: this.findingData , vifLocationAdj: this.locationData, vifNoun: this.nounData.noun, vifDamageClf: this.damageData, "defaultPhotoId": "comingsoon", inspection: inspectionjson};
 
 
 let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
  
  let findingEndpoint = AppSettingsComponent.INSPECTION_FINDING;
 
  
  if(this.type == 'update'){
    findingEndpoint = AppSettingsComponent.INSPECTION_FINDING +'/'+this.findingId;
    this.http.patch(findingEndpoint,newfinding).subscribe(resp => {
                                     // alert(resp['_body']);  
                                     //alert(resp['_body']); 
                                    // let newinspection = JSON.parse(resp['_body']);
        
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
                                     // alert(resp['_body']);  
                                     //alert(resp['_body']); 
                                    // let newinspection = JSON.parse(resp['_body']);
        
        loader.dismiss();
        this.navCtrl.push(FindingsearchPage,{id:this.inspectiondata.id,itemdata: this.inspectiondata});
    },
    
     err => { 
                loader.dismiss();
                alert(err);
            }
    
    );
 
 }
  

}


portChange(event: { component: SelectSearchable, value: any }) {
        console.log('port:', event.value);
        this.nounData = event.value;
    }
  
}
