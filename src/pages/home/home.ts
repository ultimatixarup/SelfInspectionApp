import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AuthService } from '../../services/auth.service';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {

 items: Array<{name: any,description: any}>;
 


  constructor(
  public navCtrl: NavController,public auth: AuthService) {
       // alert(auth.isAuthenticated());
        if(auth.isAuthenticated()){
           // alert("forwarding");
            navCtrl.push(InspectiondetailsPage,{});
        }
  }
  
  
  login(){
    this.auth.login();
    if(this.auth.isAuthenticated()){
            this.navCtrl.setRoot(InspectiondetailsPage,{});
    }
  }
  
  
  }
