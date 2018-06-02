

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
        
        
       if(barcodeData.text){
         if(barcodeData.text.length==18){
            barcodeData.text = barcodeData.text.substring(1);
         }
         this.navCtrl.push(VinresultPage,{vin:barcodeData.text});
       }
        
        
        
    }).catch(err => {
        console.log('Error',err);
        
    });
    
  }
  
  search(){
  
    this.navCtrl.push(VinresultPage,{vin:this.inputVin});


  }
  
  gohome(){
  this.navCtrl.setRoot(InspectiondetailsPage);
}

  
  setFilteredItems(inputVin){
    this.inputVin = inputVin.toUpperCase();
  
  
  }

}
