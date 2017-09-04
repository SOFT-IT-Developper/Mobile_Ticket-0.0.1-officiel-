import { HomePage } from './../home/home';
import { Parametre } from './../parametre/parametre';
import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
  activeAcueil:boolean=true;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtrl: ViewController,
   protected app:App,
   private geolocation: Geolocation,
   private alertCtrl: AlertController) {
      this.activeAcueil=navParams.get('activeAcueil');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
   close() {
    this.viewCtrl.dismiss();
  }
  openParametre(){
    this.app.getRootNav().push(Parametre);
    // this.navCtrl.push(Parametre);
    // this.navCtrl.setPages(Parametre.)
    // this.navCtrl.push(Parametre);
    this.viewCtrl.dismiss();
  }
  testGeo(){
    this.getCordonat();
  }
  openAcdueill(){
    this.app.getRootNav().setRoot(HomePage);
    this.viewCtrl.dismiss();
  }
  /**
   * get geolocalisation
   */
  getCordonat(){
    this.geolocation.getCurrentPosition().then((resp) => {
    console.log(`longitude : ${resp.coords.longitude} latitude : ${resp.coords.latitude}`)
    let alert = this.alertCtrl.create({
      title: 'Test Géolocalisation',
      subTitle: `Latitude : ${ resp.coords.latitude} <br> Longitude : ${resp.coords.longitude} `,
      buttons: [{
        text: 'OK',
        handler: () => {
          // this.navCtrl.setRoot(HomePage)
          console.log('Buy clicked');
        }
      }]
    });
    alert.present();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


}
