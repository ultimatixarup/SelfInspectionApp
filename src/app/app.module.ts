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

import { HttpClientModule } from '@angular/common/http';

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

import { AppSettingsComponent } from '../components/app-settings/app-settings';

import { ImageTakerComponent } from '../components/image-taker/image-taker';

import { AidataPage } from '../pages/aidata/aidata';


import { HTTP_INTERCEPTORS } from '@angular/common/http';



import { CameraPage } from '../pages/camera/camera'; 

import { PhotosearchPage } from '../pages/photosearch/photosearch';

import { PhotoviewPage } from '../pages/photoview/photoview';

import { JWTInterceptor } from './http-interceptor'


import { SelectSearchableModule } from 'ionic-select-searchable';

import { IonicStorageModule } from '@ionic/storage';
 


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
    CameraPage,
    AidataPage,
    AppSettingsComponent,
    PhotosearchPage,
    ImageTakerComponent,
    PhotoviewPage,
    
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    CameraPage,
    AidataPage,
    AppSettingsComponent,
    PhotosearchPage,
    ImageTakerComponent,
    PhotoviewPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    ImageTakerComponent,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    
    FileTransfer,
  
  FileTransferObject,
  File,
  Camera
  ]
})
export class AppModule {}
