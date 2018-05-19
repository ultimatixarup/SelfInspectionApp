import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { AdddataPage } from '../adddata/adddata';

import { FindingsearchPage } from '../findingsearch/findingsearch';

import { Http } from '@angular/http';


import { AppSettingsComponent } from '../../components/app-settings/app-settings'
import { ImageTakerComponent } from '../../components/image-taker/image-taker';

import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the InspectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspection',
  templateUrl: 'inspection.html',
})
export class InspectionPage {

imageId:any;
imageURI:any;
 inspectiondata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public imageTaker:ImageTakerComponent,public http:Http) {
    this.inspectiondata = this.navParams.get('data');
    this.inspectiondata.createDate = this.stripDate(this.inspectiondata.createDate);
    this.imageURI = AppSettingsComponent.MEDIA_ENDPOINT + "/" + this.inspectiondata.defaultPhotoId + "/content";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionPage');
  }


gotoDetails(type){
    this.navCtrl.push(DetailPage,{'type':type});

}

addFinding(){
    this.navCtrl.push(AdddataPage,{data:this.inspectiondata,type:'new',itemdata:this.inspectiondata});

}

listFindings(item){

    this.navCtrl.push(FindingsearchPage, {id:item.id,itemdata : item});
}

update(data){
  
    this.navCtrl.push(DetailPage, {data : data});
}


imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }
  
  stripDate(date){
    return date.split('T')[0];
  }


}
