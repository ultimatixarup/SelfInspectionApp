import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

import { AdddataPage } from '../adddata/adddata';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

import { AidataPage } from '../aidata/aidata';

import { PhotosearchPage } from '../photosearch/photosearch';

import { AppSettingsComponent } from '../../components/app-settings/app-settings';
/**
 * Generated class for the FindingsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-findingsearch',
  templateUrl: 'findingsearch.html',
})
export class FindingsearchPage {
findings : any; //Array<{id:any,inspectionId:any,vifFindingAdj:any,vifLocationAdj:any,vifNoun:any,vifDamageClf:any,photos:any,inspection:any}>;
cachedFindings:any;
inspectionId:any;
itemdata:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public loadingCtrl:LoadingController) {
    
    this.inspectionId = navParams.get('id');
    this.itemdata = navParams.get('itemdata');
    let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
    this.http.get(AppSettingsComponent.INSPECTION_FINDING+'?inspectionId='+this.inspectionId).subscribe(resp => {
                                     // alert(resp['_body']);                                                                            
        this.findings = resp;
        this.findings.sort(function(a,b){
            return b.id - a.id;
        });
        this.cachedFindings = this.findings;
        loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindingsearchPage');
  }

  itemTapped(event, item){
  
    this.navCtrl.push(AdddataPage , {data: this.itemdata,itemdata: item,type:0,image:"http://www.iihs.org/media/5a157607-944d-4b7b-a05e-4363e64494ee/2Cambw/Status%20Report/42-08/lex.jpg"});
  }
  
  createFinding(){
    this.navCtrl.push(AdddataPage , {data: this.itemdata,itemdata:this.itemdata,type:1,image:"http://www.iihs.org/media/5a157607-944d-4b7b-a05e-4363e64494ee/2Cambw/Status%20Report/42-08/lex.jpg"});
  }
  
  imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }
  
  gotoAi(item){
    this.navCtrl.push(AidataPage, {data:item});
  }


 photoSearch(){
 
    this.navCtrl.setRoot(PhotosearchPage, {data:this.itemdata});
 }

 process(date){
  return date.split('T')[0];

 }

 addFinding(){

   this.navCtrl.push(AdddataPage , {data: this.itemdata,itemdata: this.itemdata,type:1 });
 }

 valid(photoid){
    if(photoid){
        if(photoid === "null"){
          return false;
        }
      return true;
    } else {
      return false;
    }
    

 }


  gohome(){
  this.navCtrl.setRoot(InspectiondetailsPage);
}

 getItems(ev: any) {
    // Reset items back to all of the items
    this.findings = this.cachedFindings;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.findings = this.findings.filter((item) => {

        return ((item.vifLocationAdj+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.vifNoun+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.vifFindingAdj+'').toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        (item.vifDamageClf+'').toLowerCase().indexOf(val.toLowerCase()) > -1 
      
        );
      })
    }
  }
  
  onCancel(event : any){
   this.findings = this.cachedFindings;
  }





}
