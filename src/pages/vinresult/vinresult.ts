import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


import { Http } from '@angular/http';


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
  private http: Http,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
  
    this.vinScanned = navParam.get('vin');
    //alert(this.vinScanned);
    this.load();

  }
  
  
  load(){
  
   let loading = this.loadingCtrl.create({
            content: 'Please wait...'
         });
  
  loading.present();
        this.http.get(AppSettingsComponent.VIN_SEARCH+'?vin='+this.vinScanned).subscribe(resp => {
              //alert(JSON.parse(resp['_body']).Results);
              
             this.results = JSON.parse(resp['_body']);
             //alert(Object.keys(results));
             
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
                        alert(err);
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
