import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettingsComponent } from '../../components/app-settings/app-settings';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';
/**
 * Generated class for the AidataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aidata',
  templateUrl: 'aidata.html',
})
export class AidataPage {
item:any;
aidata:any;
probabilities:any;
photoId:any;
aicolors:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient, public loadingCtrl:LoadingController) {
  this.aicolors = ["#6FB2D6","#C5E0EE","#DDEDF6","#F0F7FB"];
    this.item = navParams.get('data');
    if(this.item.defaultPhotoId){
        this.photoId = this.item.defaultPhotoId;
    } else {
        this.photoId = this.item.publicId;
    }
    
    
  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
    this.http.get(AppSettingsComponent.AI_SERVICE+'?imageId='+this.photoId).subscribe(resp => {
                                     
        this.aidata = resp;
        this.probabilities = this.aidata.probabilities;
       
        
        loader.dismiss();
    },
    err=>{
        alert("Error loading AI");
        loader.dismiss();
    }
    );
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AidataPage');
  }


 imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }
  
  getcolor(i){
    
    return this.aicolors[i];
  }
  
  getfrontcolor(i){
    if(i==0) return "white";
    return "black";
  }
  
   gohome(){
        this.navCtrl.setRoot(InspectiondetailsPage);
      }
  
}
