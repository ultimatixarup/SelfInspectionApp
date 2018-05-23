import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';



import { AppSettingsComponent } from '../../components/app-settings/app-settings';

/**
 * Generated class for the PhotosearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photosearch',
  templateUrl: 'photosearch.html',
})
export class PhotosearchPage {

  imageId:any;
  photos:any;
  inspectionData:any;
  categories:any;
  catData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController) {
  
  this.inspectionData = navParams.get('data');
  this.categories =[{'name':'Exterior','value':'Exterior'},{'name':'Interior','value':'Interior'}];
  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
    this.http.get(AppSettingsComponent.INSPECTION_SERVICE+'/photo/?inspectionId='+this.inspectionData.id).subscribe(resp => {
                                    // alert(resp['_body']);                                                                            
        this.photos = JSON.parse(resp['_body']);
        loader.dismiss();
    },
    err=>{
    alert(err);
    loader.dismiss();
    
    });
  }
  
  
  imagePath(photoId){
    return AppSettingsComponent.MEDIA_ENDPOINT +'/'+ photoId + '/content';
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosearchPage');
  }
  
  addPhoto(){
  
  let data = {publicId: this.imageId, "category": "Exterior","inspection": {"id": this.inspectionData.id}};
  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  loader.present();
    this.http.post(AppSettingsComponent.INSPECTION_SERVICE+'/photo',data).subscribe(resp => {
                                    // alert(resp['_body']);                                                                            
        
        loader.dismiss();
    },
    err=>{
        alert(err);
        loader.dismiss();
    });
    
    let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
    loader.present();
    this.http.get(AppSettingsComponent.INSPECTION_SERVICE+'/photo/?inspectionId='+this.inspectionData.id).subscribe(resp => {
                                    // alert(resp['_body']);                                                                            
        this.photos = JSON.parse(resp['_body']);
        loader.dismiss();
    },
    err=>{
    alert(err);
    loader.dismiss();
    
    });
    
  
  }
  
  addImage(src){

this.imageId = "1421";
/*
    
    let miscinfo = { caller: this};

this.imageTaker.addImage(src,miscinfo,function(data,miscinfo){
    let imageid = JSON.parse(data.response).id;
   
    miscinfo.caller.imageId = imageid;
         
});*/

}

}
