import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { AdddataPage } from '../adddata/adddata';

import { FindingsearchPage } from '../findingsearch/findingsearch';


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
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public imageTaker:ImageTakerComponent) {
    this.inspectiondata = this.navParams.get('data');
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



addImage(src){



this.imageTaker.addImage(src,function(data){
 
    if(this.inspectionId && this.findingId){
            let inspectionFindingPhoto = {publicId: data.id , category: "NA",inspection: {id: this.inspectionId}};
            let loader = this.loadingCtrl.create({
                content: "Saving..."
              });
              loader.present();

              let inspectionPhotoEndpoint = AppSettingsComponent.INSPECTION_PHOTO;
              
              
              this.http.post(inspectionPhotoEndpoint,inspectionFindingPhoto).subscribe(resp => {
        
                    loader.dismiss();
                    this.imageURI = AppSettingsComponent.MEDIA_ENDPOINT + "/" + data.id + "/content";
                    //this.navCtrl.push(FindingsearchPage,{id:this.inspectiondata.id,itemdata: this.inspectiondata});
                },

                 err => { 
                            loader.dismiss();
                            alert(err);
                        }

                );
              
              this.imageId = data.id;
              
              
              
              
              
              

    } else {
        alert("Need a valid inspection ID and Finding ID");
        
    }
    
    


});
}

imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }


}
