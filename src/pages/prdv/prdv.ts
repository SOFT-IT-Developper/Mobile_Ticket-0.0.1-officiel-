import { GlobalVars } from './../../providers/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the Prdv page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-prdv',
  templateUrl: 'prdv.html'
})
export class PrdvPage {
  client?:string;
  date:any;
  date2:any;
  longitude : number;
  latitude : number;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,private geolocation: Geolocation) {
     this.client=GlobalVars.getClient()
     let datenow=Date.now()
     this.date=new Date(datenow);
     this.date2=new Date();
     console.log(this.date)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrdvPage');
    this.getCordonat();
  }
   getCordonat(){
    this.geolocation.getCurrentPosition().then((resp) => {
    console.log(`longitude : ${resp.coords.longitude} latitude : ${resp.coords.latitude}`)
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
