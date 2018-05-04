import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { VinresultPage } from '../vinresult/vinresult';


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
  public navCtrl: NavController,public barcodeScanner:BarcodeScanner) {
  
  

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
