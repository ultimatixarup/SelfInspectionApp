import { Component } from '@angular/core';



import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InspectiondetailsPage;
 

  constructor() {

  }
}
