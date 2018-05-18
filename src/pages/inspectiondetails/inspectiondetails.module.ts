import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectiondetailsPage } from './inspectiondetails';

@NgModule({
  declarations: [
    InspectiondetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectiondetailsPage),
  ],
})
export class InspectiondetailsPageModule {}
