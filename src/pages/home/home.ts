import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner,private screenOrientation: ScreenOrientation) {

  }
  
  scan(){
   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.barcodeScanner.scan({
                    orientation:'portrait',
                    showTorchButton:true
                }).then(barcodeData => {
        alert('Barcode data - ' + barcodeData.text);
        this.screenOrientation.unlock();
    }).catch(err => {
        console.log('Error',err);
    });
    
  }

}
