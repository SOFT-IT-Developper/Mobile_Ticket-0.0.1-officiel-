import { Restservice } from './../../providers/restservice';
import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
//import {StorageM} from '../../app/providers/storage'
import { Storage } from '@ionic/storage';
/*
  Generated class for the Geolocalisation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;
@Component({
  selector: 'page-geolocalisation',
  templateUrl: 'geolocalisation.html',
  // providers: [Geolocation]

})
export class GeolocalisationPage {
public map:any;
public address: string[];
adr:string;
lat:any[];
prefix:number;
num:number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,/*private geolocation: Geolocation*/
    private restservice:Restservice,
    private load:LoadingController,private storage:Storage) {
      this.prefix= +229;
      storage.ready().then(() => {
       storage.get('numero').then((val) => {
        // console.log('Your age is', val);
         if(val!=null && val!="NaN"){
        //  this.navCtrl.push(TabsPage);
        //this.getMum();
        //this.getMelocalise();
         }else{
        // this.getMelocalise();
         }

       })
     });

  }
 /*
ngOnInit() {
this.getMum();
 // this.geolocate();
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getMelocalise();
if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
        console.info(position.coords.latitude);
        console.info(position.coords.longitude);
      }, error => {
        console.log(error);
      }, options);
    }
}*/
/*liernum(){
this.storage.getMum().then(
  num=>{
    this.num=num;
  }
);
}*/
/*getMelocalise(){
  let loading=this.load.create({
    content:'Localisation en cours .....',
    duration: 3000
  });
  loading.present(loading);


  this.geolocation.getCurrentPosition().then((resp) => {

  console.log( resp.coords.latitude+' longitude '+resp.coords.longitude);


    //let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let l= resp.coords.latitude+','+  resp.coords.longitude
     let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

  loading.dismissAll;
  if(loading.onDidDismiss){
    console.log("lat "+latLng);
this.sechAdr(l);
  }else{
    loading.present();
  }

}).catch((error) => {
  console.log('Error getting location', error);
});

}
 sechAdr(adr){
   console.log("secch"+adr);
this.restservice.getAdresse(adr).subscribe(resp=>{
  resp=resp.results;
  this.adr=resp[0].address_components[5].long_name;
  console.log('long_name '+resp[0].address_components[5].long_name);
 console.log(resp[0]);
}
);
}*/
 /*public geolocate():void{

  this.geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:5000, maximumAge:0}).then(position => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.map.setCenter(latLng);

        let marker = new google.maps.Marker({
            position:position,
            title:'Location',
            animation: google.maps.Animation.DROP,
            dragable:true
        });

       marker.setMap(this.map);

       new google.maps.Geocoder().geocode({'location':latLng}, function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          this.address = results[0].formatted_address;
          console.log(this .addresses);
        }
       });});


 }*/
 continus()
{
  console.log(this.prefix);
  this.addMum(this.prefix+this.num);
  // this.navCtrl.push(TabsPage);
  console.log('continus');
}

/** Manipulation de stockage */
getMum(){
this.storage.get('numero').then(data=>{

  data=data;
  this.num=data;
  console.log(data);
  return data;
})
}
addMum(num:any){
  console.log(num);
this.storage.set('numero',''+num);
this.getMum();
}
}
