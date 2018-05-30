

import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { VinresultPage } from '../vinresult/vinresult';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

/**
 * Generated class for the VinsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vinsearch',
  templateUrl: 'vinsearch.html',
})
export class VinsearchPage {
 inputVin:any;
  constructor(
  public navCtrl: NavController,public barcodeScanner:BarcodeScanner,) {
 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VinsearchPage');
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
  
  home(){
  
    this.navCtrl.setRoot(InspectiondetailsPage);
  }

}
