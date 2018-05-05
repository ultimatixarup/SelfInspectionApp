import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AdddataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adddata',
  templateUrl: 'adddata.html',
})
export class AdddataPage {

  image:any;
  source:any;
  nounsData:Array<{noun:string,category:string,vsa:string,ewu:string}>;
  nouns:Array<{noun:string,category:string,vsa:string,ewu:string}>;
  locations:Array<{locationAdj:string}>;
  damages:Array<{damageClf:string}>;
  catagories:Array<{name:string}>;
  locationData:any;
  nounData:any;
  damageData:any;
  categoryData:any;
  findings:Array<{findingAdj:string}>;
  findingData:any;
  inspectionFindings:Array<{id:any,inspectionId:any,vifFindingAdj:any,vifLocationAdj:any,vifNoun:any,vifDamageClf:any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController) {
    this.image = this.navParams.get('image');
    this.source = this.navParams.get('source');
    this.nounsData = JSON.parse(window.localStorage.getItem("NOUNS"));
    this.findings = JSON.parse(window.localStorage.getItem("FINDINGS"));
    this.catagories = [];
    for(var i=0;i<this.nounsData.length;i++){
      let found = false;
      for(var j=0;j<this.catagories.length;j++){
          let tcat = this.catagories[j];
          if(tcat.name == this.nounsData[i].category){
            found = true;
            break;
          }
      }
      if(!found){
        let cat = {name:this.nounsData[i].category};

        this.catagories.push(cat);

      }
      
      
    }
    console.log(this.catagories);
    this.locations = JSON.parse(window.localStorage.getItem("LOCATIONS"));
    //alert(window.localStorage.getItem("DAMAGES"));
    this.damages = JSON.parse(window.localStorage.getItem("DAMAGES"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdddataPage');
  }

 optionSelected() {
let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
    this.http.get('https://inspection-service.herokuapp.com/inspection/resources/noun?category='+this.categoryData).subscribe(resp => {
                                                                                                                  
        this.nouns = JSON.parse(resp['_body']);
        loader.dismiss();
    });


    alert(this.categoryData);
  }


addInspection(){

    

}
  
}
