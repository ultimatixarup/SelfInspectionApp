import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 items: Array<{name: any,description: any}>;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner,private screenOrientation: ScreenOrientation,public loadingCtrl: LoadingController,private http: Http) {

  }
  
  scan(){
   
   
   
    this.barcodeScanner.scan({
                    showTorchButton:true
                }).then(barcodeData => {
        alert('Barcode data - ' + barcodeData.text);
        
       let loading = this.loadingCtrl.create({
            content: 'Please wait...'
         });
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
        
        
        
    }).catch(err => {
        console.log('Error',err);
    });
    
  }

}
