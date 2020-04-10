import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotosearchPage } from './photosearch';

@NgModule({
  declarations: [
    PhotosearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosearchPage),
  ],
})
export class PhotosearchPageModule {}
