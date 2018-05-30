import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoviewPage } from './photoview';

@NgModule({
  declarations: [
    PhotoviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoviewPage),
  ],
})
export class PhotoviewPageModule {}
