import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { VinresultPage } from '../vinresult/vinresult';

import { Http } from '@angular/http';

import { LoadingController } from 'ionic-angular';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

import { VinsearchPage } from '../vinsearch/vinsearch';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'


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
inputVin:any;
vinScanned:any;
inspectorId:any;

  constructor(
  public navCtrl: NavController,public barcodeScanner:BarcodeScanner,public http:Http,public loadingCtrl: LoadingController) {
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
    this.initializeCache();
    loader.dismiss();

  }

  initializeCache(){

  this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_NOUN).subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("NOUNS",resp['_body']);
  }, 1000);
});

this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_LOCATION).subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("LOCATIONS",resp['_body']);
  }, 1000);
});

this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_DAMAGE).subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("DAMAGES",resp['_body']);
  }, 1000);
});

this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_FINDING).subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("FINDINGS",resp['_body']);
  }, 1000);
  });


  }
  
  
  
  

  vinSearch(){
    window.localStorage.setItem("INSPECTOR",this.inspectorId);
    this.navCtrl.push(VinsearchPage , {});
    
  }
  }
