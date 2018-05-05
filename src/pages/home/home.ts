import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { VinresultPage } from '../vinresult/vinresult';

import { Http } from '@angular/http';

import { LoadingController } from 'ionic-angular';


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

  this.http.get('https://inspection-service.herokuapp.com/inspection/resources/noun').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("NOUNS",resp['_body']);
  }, 1000);
});

this.http.get('https://inspection-service.herokuapp.com/inspection/resources/location').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("LOCATIONS",resp['_body']);
  }, 1000);
});

this.http.get('https://inspection-service.herokuapp.com/inspection/resources/damage').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("DAMAGES",resp['_body']);
  }, 1000);
});

this.http.get('https://inspection-service.herokuapp.com/inspection/resources/finding').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("FINDINGS",resp['_body']);
  }, 1000);
  });


  }
  
  
  scan(){
   
   
    this.barcodeScanner.scan({
                    showTorchButton:true
                }).then(barcodeData => {
        alert('Barcode data - ' + barcodeData.text);
        
       if(barcodeData.text){
        
         this.navCtrl.push(VinresultPage,{vin:barcodeData.text});
       }
        
        
        
    }).catch(err => {
        console.log('Error',err);
        
    });
    
  }
  
  search(){
  
    this.navCtrl.push(VinresultPage,{vin:this.inputVin});


  }
  }
