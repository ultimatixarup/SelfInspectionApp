import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettingsComponent } from '../../components/app-settings/app-settings';
import { AidataPage } from '../aidata/aidata';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

/**
 * Generated class for the PhotoviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photoview',
  templateUrl: 'photoview.html',
})
export class PhotoviewPage {

  item : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoviewPage');
  }

   imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }


  gohome(){
  this.navCtrl.setRoot(InspectiondetailsPage);
}

  gotoAi(item){
    this.navCtrl.push(AidataPage, {data:item});
  }

}
