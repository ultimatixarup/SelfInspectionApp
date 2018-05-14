import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { AdddataPage } from '../adddata/adddata';

import { FindingsearchPage } from '../findingsearch/findingsearch';


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


 inspectiondata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inspectiondata = this.navParams.get('data');
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

}
