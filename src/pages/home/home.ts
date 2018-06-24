import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AuthService } from '../../services/auth.service';

import { InspectiondetailsPage } from '../inspectiondetails/inspectiondetails';

import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {

 items: Array<{name: any,description: any}>;
 


  constructor(
  public navCtrl: NavController,public auth: AuthService, public platform:Platform) {
  
       if(this.platform.is('ios')){ 
        alert("cons="+auth.isAuthenticated());
        if(auth.isAuthenticated()){
           // alert("forwarding");
            navCtrl.push(InspectiondetailsPage,{});
        }
        } else {
            this.navCtrl.setRoot(InspectiondetailsPage,{});
        }
  }
  
  
  login(){
    this.auth.login();
    if(this.auth.isAuthenticated()){
            this.navCtrl.setRoot(InspectiondetailsPage,{});
    }
  }
  
  
  }
