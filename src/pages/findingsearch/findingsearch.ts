import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { AdddataPage } from '../adddata/adddata';

import { AppSettingsComponent } from '../../components/app-settings/app-settings'
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
findings : Array<{id:any,inspectionId:any,vifFindingAdj:any,vifLocationAdj:any,vifNoun:any,vifDamageClf:any,photos:any,inspection:any}>;
inspectionId:any;
itemdata:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController) {
    
    this.inspectionId = navParams.get('id');
    this.itemdata = navParams.get('itemdata');
    let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
    this.http.get(AppSettingsComponent.INSPECTION_FINDING+'?inspectionID='+this.inspectionId).subscribe(resp => {
                                     // alert(resp['_body']);                                                                            
        this.findings = JSON.parse(resp['_body']);
        loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindingsearchPage');
  }

  itemTapped(event, item){
    this.navCtrl.push(AdddataPage , {itemdata: item,'image':"http://www.iihs.org/media/5a157607-944d-4b7b-a05e-4363e64494ee/2Cambw/Status%20Report/42-08/lex.jpg"});
  }

}
