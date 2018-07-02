import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



import { LoadingController } from 'ionic-angular';
import { FindingsearchPage } from '../findingsearch/findingsearch';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'

import { DetailPage } from '../detail/detail';

import { VinsearchPage } from '../vinsearch/vinsearch';

import { HomePage } from '../home/home';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import { Platform } from 'ionic-angular';



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
  providers: [AuthService]
})
export class InspectiondetailsPage {
inspectorId:any;
imagepath:any;
idToken:any;
  inspections : any;//Array<{id:any,year:any,make:any,model:any,vin:any,inspectorId:any,licensePlateNumber:any,licensePlateState:any,odometer:any,createDate:any,defaultPhotoId:any,findings:any,photos:any}>;
  cachedInspections:any;
  constructor(public navCtrl: NavController, public platform:Platform,public navParams: NavParams,public http:HttpClient,public loadingCtrl:LoadingController,public auth:AuthService) {
    
    let idToken = (window.location + "").split('=')[1];
    
    if(idToken){ window.localStorage.setItem('id_token',idToken); }
    this.imagepath = AppSettingsComponent.MEDIA_ENDPOINT;
    this.inspectorId = 1; //window.localStorage.getItem("INSPECTOR");
    window.localStorage.setItem("INSPECTOR",this.inspectorId);
    
  
  this.initializeCache();
  
  this.initializeItems();
  
   
  }

  initializeItems(){
    let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
      this.http.get(AppSettingsComponent.INSPECTION_SERVICE).subscribe(resp => {
                                         // alert(resp['_body']);  
                                         console.log(resp);                                                                          
            this.inspections = resp;
            
            this.inspections.sort(function(a,b){
                return b.id - a.id;
            });
            this.cachedInspections = this.inspections;
            loader.dismiss();
        },
err=>{
    console.log(err);
    loader.dismiss();
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectiondetailsPage');
  }

   itemTapped(event, item) {
      this.navCtrl.push(FindingsearchPage, {id:item.id,itemdata : item});
  }

 
  
  openInspection(item){
    this.navCtrl.setRoot(DetailPage, {data : item});
   
  }
  
  imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }
  
  listFindings(item){

    this.navCtrl.push(FindingsearchPage, {id:item.id,itemdata : item});
}

process(date){

    return date.split('T')[0];
}

vinSearch(){
    this.navCtrl.push(VinsearchPage, {});

}

 initializeCache(){

  this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_NOUN).subscribe(resp => {
                                                                                                                 
    
    setTimeout(() => {
        window.localStorage.setItem("NOUNS",JSON.stringify(resp));
  }, 1000);
},
err=>{
    console.log(err);
});

this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_LOCATION).subscribe(resp => {
                                                                                                                 
    
    setTimeout(() => {
        window.localStorage.setItem("LOCATIONS",JSON.stringify(resp));
  }, 1000);
},
err=>{
    console.log(err);
});

this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_DAMAGE).subscribe(resp => {
                                                                                                                 
    
    setTimeout(() => {
        window.localStorage.setItem("DAMAGES",JSON.stringify(resp));
  }, 1000);
},
err=>{
    console.log(err);
});

this.http.get(AppSettingsComponent.INSPECTION_RESOURCE_FINDING).subscribe(resp => {
                                                                                                                 
    
    setTimeout(() => {
        window.localStorage.setItem("FINDINGS",JSON.stringify(resp));
  }, 1000);
  });


  }
  

   getItems(ev: any) {
    // Reset items back to all of the items
    this.inspections = this.cachedInspections;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.inspections = this.inspections.filter((item) => {

        return (item.make.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.model.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.vin.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.year+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.licensePlateNumber+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.licensePlateState+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.odometer+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.createDate.split('T')[0].indexOf(val.toLowerCase()) > -1
        );
      })
    }
  }
  
  onCancel(event : any){
   this.inspections = this.cachedInspections;
  }
  
  
  
  logout(){
     
   //this.auth.logout();
      if(this.platform.is('ios')){                               
      this.navCtrl.setRoot(HomePage, {});
      } else {
        window.location.replace('http://ins-master-web-login-dev.herokuapp.com');
      }
  }

}
