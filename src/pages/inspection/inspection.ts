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

    
    let miscinfo = { caller: this};

this.imageTaker.addImage(src,miscinfo,function(data,miscinfo){
    //let imageid = JSON.parse(data.response).id;
    let imageid = 10;
     //alert("miscinfo="+JSON.stringify(miscinfo));
    miscinfo.caller.imageURI = AppSettingsComponent.MEDIA_ENDPOINT + "/" + imageid + "/content";
     let insepctioninput = {year:miscinfo.caller.inspectiondata.year,make:miscinfo.caller.inspectiondata.make,model:miscinfo.caller.inspectiondata.model,vin:miscinfo.caller.inspectiondata.vin,inspectorId:miscinfo.caller.inspectiondata.inspectorId,licensePlateNumber:miscinfo.caller.inspectiondata.licensePlate,licensePlateState:miscinfo.caller.inspectiondata.state,odometer:this.odometer,createDate:'',defaultPhotoId:imageid};
    miscinfo.caller.inspectiondata.inspectorId = window.localStorage.getItem("INSPECTOR");

    
            let findingEndpoint = AppSettingsComponent.INSPECTION_SERVICE +'/'+miscinfo.caller.inspectiondata.id;
         
            miscinfo.caller.http.patch(findingEndpoint,insepctioninput).subscribe(resp => {
                                             // alert(resp['_body']);  
                                             //alert(resp['_body']); 
                                            //let newinspection = JSON.parse(resp['_body']);
                                            

                
               
            },

             err => { 
                        loader.dismiss();
                        alert(err);
                    }

            );
 
 
    
    
    
    
    
    
  
    alert(miscinfo.caller.inspectiondata.id);
            let inspectionFindingPhoto = {publicId: imageid , category: imageid,inspection: {id: miscinfo.caller.inspectiondata.id}};
            let loader = miscinfo.caller.loadingCtrl.create({
                content: "Saving..."
              });
              loader.present();

              let inspectionPhotoEndpoint = AppSettingsComponent.INSPECTION_PHOTO;
              
              
              miscinfo.caller.http.post(inspectionPhotoEndpoint,inspectionFindingPhoto).subscribe(resp => {
        
                    loader.dismiss();
                    miscinfo.caller.imageURI = AppSettingsComponent.MEDIA_ENDPOINT + "/" + imageid + "/content";
                    alert(miscinfo.caller.imageURI);
                    //this.navCtrl.push(FindingsearchPage,{id:this.inspectiondata.id,itemdata: this.inspectiondata});
                },

                 err => { 
                            loader.dismiss();
                            alert(err);
                        }

                );
              
});
}

imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }


}
