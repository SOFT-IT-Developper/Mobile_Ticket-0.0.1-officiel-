import { timeout } from 'rxjs/operator/timeout';

import { GlobalConstant } from './../../providers/constants';
import { Common } from './../../providers/common';
import { GlobalVars } from './../../providers/global';
import { PrdvPage } from './../prdv/prdv';
import { PopoverPage } from './../popover/popover';
import { Component } from '@angular/core';
import { NavController,PopoverController } from 'ionic-angular';
import {ListagencePage}  from'../listagence/listagence'
import {MarketingPage} from '../marketing/marketing'
import {TranslateService} from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  client:string
  startRefrech:number=1;

  constructor(private globalvars:GlobalVars,
    private navCtrl: NavController,
    private translate: TranslateService,
    private popoverCtrl: PopoverController,
    private geolocation: Geolocation,
    private common:Common) {
    this.client=GlobalVars.getClient();
  }

  private goToAgencePage(){
  this.navCtrl.push(ListagencePage);
    console.log("test");
  } /*
   private parametreshow(){
  this.navCtrl.push(Parametre);
    console.log("test");
  }
  private showServices() {
  //  this.navCtrl.push(ServicePage);
  }*/
  private showMarketing() {
    this.navCtrl.push(MarketingPage);
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.getCordonat();

  }
   ngAfterViewInit() {
     // console.log("startRefreshTim begin")
    this.startRefrech =setInterval(()=>{
      console.log("startRefreshTim begin")
      this.refleshCordonat();
    }, GlobalConstant.GEO_REFRESH_TIMER)
  }
  ionViewWillLeave() {
    console.log("Quiter la page Home")
    if (this.startRefrech) {
      console.log("clearInterval ionViewWillLeave")
    clearInterval(this.startRefrech);
   }}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage,{"activeAcueil":true});
    popover.present({
      ev: myEvent
    });
  }
  pageprdv(){
    this.navCtrl.push(PrdvPage);
  }
  /**
   * Recuperer les cordonnées de geolocalisation
   */
  getCordonat(){
    this.common.presentLoadingDefault();
    // this.common.LoadingCustom();
    console.log("timeout geo "+GlobalConstant.GEO_TIMEOUT)
    this.geolocation.getCurrentPosition({timeout:GlobalConstant.GEO_TIMEOUT}).then((resp) => {
    console.log(`longitude : ${resp.coords.longitude}  latitude : ${resp.coords.latitude}`)
    this.globalvars.setLatitude(resp.coords.latitude);
    this.globalvars.setLongitude(resp.coords.longitude);
    this.common.loadingfinish()
    // this.common.LoadingCustomfinish()
  }).catch((error) => {
    this.globalvars.setLatitude(0);
    this.globalvars.setLongitude(0);
       this.common.loadingfinish()
      //  this.common.LoadingCustomfinish()
      console.log('Error getting location', error);
    });
  }
  refleshCordonat(){
    // this.common.LoadingCustom();
    console.log("timeout geo "+GlobalConstant.GEO_TIMEOUT)
    this.geolocation.getCurrentPosition({timeout:GlobalConstant.GEO_TIMEOUT}).then((resp) => {
    console.log(`longitude : ${resp.coords.longitude}  latitude : ${resp.coords.latitude}`)
    this.globalvars.setLatitude(resp.coords.latitude);
    this.globalvars.setLongitude(resp.coords.longitude);
    // this.common.LoadingCustomfinish()
  })
  .catch((error) => {
    this.globalvars.setLatitude(0);
    this.globalvars.setLongitude(0);
      //  this.common.LoadingCustomfinish()
      console.log('Error getting location', error);
    });
  }


}
