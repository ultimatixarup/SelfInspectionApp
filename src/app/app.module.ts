import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { HttpModule } from '@angular/http';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { InspectionPage } from '../pages/inspection/inspection';
import { DetailPage } from '../pages/detail/detail';
import { VinresultPage } from '../pages/vinresult/vinresult';

import { AdddataPage } from '../pages/adddata/adddata';

import { InspectiondetailsPage } from '../pages/inspectiondetails/inspectiondetails';

import { FindingsearchPage } from '../pages/findingsearch/findingsearch';

import { VinsearchPage } from '../pages/vinsearch/vinsearch'; 

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    InspectionPage,
    DetailPage,
    VinresultPage,
    AdddataPage,
    InspectiondetailsPage,
    FindingsearchPage,
    VinsearchPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    InspectionPage,
    DetailPage,
    VinresultPage,
    AdddataPage,
    InspectiondetailsPage,
    FindingsearchPage,
    VinsearchPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
  
  FileTransferObject,
  File,
  Camera
  ]
})
export class AppModule {}
