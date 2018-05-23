import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettingsComponent } from '../../components/app-settings/app-settings';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public loadingCtrl:LoadingController) {
    this.item = navParams.get('data');
  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
    this.http.get(AppSettingsComponent.AI_SERVICE+'?imageId='+this.item.defaultPhotoId).subscribe(resp => {
                                     
        this.aidata = JSON.parse(resp['_body']);
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
  
}
