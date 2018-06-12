import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { AdddataPage } from '../adddata/adddata';

import { DetailPage } from '../detail/detail';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

import { FindingsearchPage } from '../findingsearch/findingsearch';


import { AppSettingsComponent } from '../../components/app-settings/app-settings';

import { ImageTakerComponent } from '../../components/image-taker/image-taker';

import { PhotoviewPage } from '../photoview/photoview';

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
  selectCover:boolean;
  inspectioninput:any;
  inspectionEndpoint:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController,public imageTaker:ImageTakerComponent) {
  
  this.inspectionData = navParams.get('data');
  this.selectCover = navParams.get('selectCover');
  this.categories =[{'name':'Exterior','value':'Exterior'},{'name':'Interior','value':'Interior'},
  {'name':'Left','value':'Left'},
  {'name':'Right','value':'Right'},
  {'name':'Front','value':'Front'},
  {'name':'Back','value':'Back'}];
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
  
  let data = {publicId: this.imageId, "category": this.catData,"inspection": {"id": this.inspectionData.id}};
  let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  
  
  loader.present();
    this.http.post(AppSettingsComponent.INSPECTION_SERVICE+'/photo',data).subscribe(resp => {
                                    // alert(resp['_body']);  
                                    
                                    
                                    
    this.http.get(AppSettingsComponent.INSPECTION_SERVICE+'/photo/?inspectionId='+this.inspectionData.id).subscribe(resp => {
                                    // alert(resp['_body']);                                                                            
        this.photos = JSON.parse(resp['_body']);
        loader.dismiss();
    },
    err=>{
    alert(err);
    loader.dismiss();
    
    });                     
                                    
        
        
    },
    err=>{
        alert(err);
        loader.dismiss();
    });
    
  

    
    
  
  }
  
  addImage(src){

//this.imageId = "1421";

    
    let miscinfo = { caller: this};

this.imageTaker.addImage(src,miscinfo,function(data,miscinfo){
    let imageid = JSON.parse(data.response).id;
   
    miscinfo.caller.imageId = imageid;
         
});

}



addFinding(){
    this.navCtrl.push(AdddataPage , {data: this.inspectionData,itemdata: this.inspectionData,type:1 });
    

}

process(data){
  return data.split('T')[0];

}

listFinding(){
 
  this.navCtrl.push(FindingsearchPage, {id:this.inspectionData.id,itemdata : this.inspectionData});
}

  gohome(){
  this.navCtrl.setRoot(InspectiondetailsPage);
}

openPhoto(item){

  if(this.selectCover){
    this.inspectioninput = item.inspection;
    this.inspectioninput.defaultPhotoId = item.publicId;
    this.inspectionEndpoint = AppSettingsComponent.INSPECTION_SERVICE + "/" + item.inspection.id;
    let loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  
  
  loader.present();
         this.http.patch(this.inspectionEndpoint,this.inspectioninput).subscribe(resp => {
                                     
                                      
                                      
        
            loader.dismiss();
            
           // this.navCtrl.push(InspectiondetailsPage,{data:newinspection});
        },
         err => { 
                    loader.dismiss();
                    alert(err);
                }




        );
        this.navCtrl.setRoot(DetailPage, {data : item.inspection});
  
  } else {
 
  this.navCtrl.push(PhotoviewPage, {item:item});
}
}

goback(item){
  this.navCtrl.setRoot(DetailPage, {data : item });
}

}
