import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


import { HttpClient } from '@angular/common/http';


import { ToastController } from 'ionic-angular';

import { InspectionPage } from '../inspection/inspection';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'

import { DetailPage } from '../detail/detail';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';


@Component({
  selector: 'page-vinresult',
  templateUrl: 'vinresult.html'
})
export class VinresultPage {

 items: Array<{name: any,description: any}>;
 
 imageURI:any;
imageFileName:any;
fileName:any;
type:any;
vinScanned:any;
results:any;

  constructor(
  public navCtrl: NavController, 
  public navParam: NavParams,
  private http: HttpClient,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
  
    this.vinScanned = navParam.get('vin');
    
    this.load();

  }
  
  process(vins){
 
      if(vins.length > 17) return vins.substring(1);
      else return vins;
  }
  
  load(){
  
   let loading = this.loadingCtrl.create({
            content: 'Please wait...'
         });
  
  loading.present();
        this.http.get(AppSettingsComponent.VIN_SEARCH+'?vin='+this.process(this.vinScanned)).subscribe(resp => {
              
              
             this.results = resp;
             
             
             let keys = Object.keys(this.results);
             
             this.items = [];
             for(var i=0;i<keys.length;i++){
                if(typeof this.results[keys[i]] != "object"){
                    var item = {
                        name : keys[i],
                        description: this.results[keys[i]]
                    };
                    this.items.push(item);
                }
             }
             this.vinScanned = true;
             loading.dismiss();
            
         
       },
        err => { 
                        loading.dismiss();
                        console.log(err);
                    }

            );
       
      
  
  }

goToInspections(type){

    this.navCtrl.push(InspectionPage, {'type': type});


}
goToNewInspection(){
    this.navCtrl.setRoot(DetailPage, {vinresult : this.results });

}

  gohome(){
  this.navCtrl.setRoot(InspectiondetailsPage);
}

}
