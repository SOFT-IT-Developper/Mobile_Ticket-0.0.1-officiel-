import { MobileServer } from './../providers/mobileserver';
import { Restservice } from './../providers/restservice';
import { GlobalVars } from './../providers/global';
import { Common } from './../providers/common';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Settings } from './../providers/settings';
import { PrdvPage } from './../pages/prdv/prdv';
import { ErrorComponent } from './../components/error/error';
import { PopoverPage } from './../pages/popover/popover';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Showticket } from '../pages/showticket/showticket';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ServicePage } from '../pages/service/service'
import { ListagencePage } from '../pages/listagence/listagence';
import { MarketingPage } from '../pages/marketing/marketing';
import { Parametre } from '../pages/parametre/parametre';
import { GeolocalisationPage } from '../pages/geolocalisation/geolocalisation'
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Http } from '@angular/http'
import { AppMinimize } from '@ionic-native/app-minimize';
import { createTranslateLoader } from "../providers/createTranslateLoader";
//new Import ionic 3
import {BrowserModule} from '@angular/platform-browser'
import { Geolocation } from '@ionic-native/geolocation';
import { DistanceCalculatorProvider } from '../providers/distance-calculator/distance-calculator';



//import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
/*
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3639a903'
  },
  'push': {
    'sender_id': '989212956025',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};*/
@NgModule({
  declarations: [
    MyApp,
    Showticket,
    ContactPage,
    HomePage,
    ListagencePage,
    MarketingPage,
    Parametre,
    GeolocalisationPage,
    ServicePage,
    PopoverPage,
    ErrorComponent,
    PrdvPage,



    //  PostticketPage
  ],
  imports: [HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Showticket,
    ContactPage,
    HomePage,
    ListagencePage,
    MarketingPage,
    Parametre,
    GeolocalisationPage,
    ServicePage,
    PopoverPage,
    PrdvPage,
    // PostticketPage
  ],
  providers: [SplashScreen,
              StatusBar,
    Settings,Restservice, MobileServer, Common, GlobalVars, BackgroundMode, AppMinimize, { provide: ErrorHandler, useClass: IonicErrorHandler },

    Geolocation,
    DistanceCalculatorProvider]
})
export class AppModule { }
