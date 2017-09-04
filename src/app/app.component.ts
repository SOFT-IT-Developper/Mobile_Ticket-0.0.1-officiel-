import { MobileServer } from './../providers/mobileserver';
import { GlobalVars } from './../providers/global';
import { Settings } from './../providers/settings';
import {HomePage }from './../pages/home/home';
import {Component }from '@angular/core';
import {Platform }from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StatusBar } from '@ionic-native/status-bar';
//import { TabsPage } from '../pages/tabs/tabs';
//import {GeolocalisationPage} from '../pages/geolocalisation/geolocalisation'
import {Storage }from '@ionic/storage';
import {TranslateService}from '@ngx-translate/core';

/*import {
  Push,
  PushToken
} from '@ionic/cloud-angular';  */
@Component( {
templateUrl:'app.html'
})
export class MyApp {


rootPage = HomePage;
selectedTheme: String;

constructor(platform:Platform,
  private storage:Storage,
  private translate:TranslateService,
  private mobileServer:MobileServer,
  private globalvars:GlobalVars,
  private splashScreen:SplashScreen,
  private statusBar:StatusBar,
  private settings:Settings) {
//Chargement du theme
  this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
/**chargement de la translation  */
  this.translateConfig();
  this.initConfig();
  platform.ready().then(() =>  {

 this.statusBar.styleDefault();
 this.splashScreen.hide();
  });
}


/**methode de chargement de la langue */
translateConfig() {
  var userLang = navigator.language.split('-')[0]; // use navigator lang if available
  userLang = /(fr | en)/gi.test(userLang)?userLang:'fr';

  // this language will be used as a fallback when a translation isn't found in the current language
  this.translate.setDefaultLang('fr');
  // the lang to use, if the lang isn't available, it will use the current loader to get them
  this.translate.use(userLang);
}

/**requete de check serveur mobile pour la recuperation l'adresse api getway */
  initConfig() {
    var useMobileServer=false;
    if(useMobileServer) {
      //Recupere les infos de l'API getway sur le mobile serveur
      this.mobileServer.getApiGetWayInfo().subscribe(api=>{
        console.log(api);
        this.globalvars.setUrl(api.apigetwayurl);
        this.storage.set('url', api.apigetwayurl);
        this.storage.set('client', api.name);
        this.globalvars.setClient(api.name);
        console.log('MyApp.getconfig');
      },error=>{
        console.log(error);
      })
    } else {
      // Url direct de l'API Gateway
      this.globalvars.setUrl('http://10.77.210.19:9090/MobileTicket/')
      // this.globalvars.setUrl('http://192.168.0.167:9090/MobileTicket/')
      // this.globalvars.setClient("SOFT-IT");
      this.globalvars.setClient("MTN BENIN");
      //this.globalvars.setClient("Moov Bénin");
      // Url proxy de l'API Gateway en mode developpement
      this.globalvars.setUrl('/api/')
    }
  }

}
