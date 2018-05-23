import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { FindingsearchPage } from '../findingsearch/findingsearch';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'

import { DetailPage } from '../detail/detail';




/**
 * Generated class for the InspectiondetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspectiondetails',
  templateUrl: 'inspectiondetails.html',
})
export class InspectiondetailsPage {
inspectorId:any;
imagepath:any;
  inspections : Array<{id:any,year:any,make:any,model:any,vin:any,inspectorId:any,licensePlateNumber:any,licensePlateState:any,odometer:any,createDate:any,defaultPhotoId:any,findings:any,photos:any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController) {
    this.imagepath = AppSettingsComponent.MEDIA_ENDPOINT;
    this.inspectorId = window.localStorage.getItem("INSPECTOR");
    
    let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  
  loader.present();
  
    if(this.inspectorId > 0){
        this.http.get(AppSettingsComponent.INSPECTION_SERVICE+'?inspectorId='+this.inspectorId).subscribe(resp => {
                                         // alert(resp['_body']);                                                                            
            this.inspections = JSON.parse(resp['_body']);
            loader.dismiss();
        });
    } else {
       this.http.get(AppSettingsComponent.INSPECTION_SERVICE).subscribe(resp => {
                                         // alert(resp['_body']);                                                                            
            this.inspections = JSON.parse(resp['_body']);
            loader.dismiss();
        });
    
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectiondetailsPage');
  }

   itemTapped(event, item) {
      this.navCtrl.push(FindingsearchPage, {id:item.id,itemdata : item});
  }

 
  
  openInspection(item){
    this.navCtrl.push(DetailPage, {data : item});
   
  }
  
  imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }
  
  listFindings(item){

    this.navCtrl.push(FindingsearchPage, {id:item.id,itemdata : item});
}

}
