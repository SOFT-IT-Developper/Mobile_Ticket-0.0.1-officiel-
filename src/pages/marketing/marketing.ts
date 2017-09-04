import { MarketingEntitie } from './../../app/entitie/marketingEntite';
import { Restservice } from './../../providers/restservice';
import { GlobalVars } from './../../providers/global';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import {ServicesPage}  from'../services/services'
//import {ListagencePage}  from'../listagence/listagence'


@Component({
  selector: 'page-marketing',
  templateUrl: 'marketing.html',
})
export class MarketingPage {
Marckic: MarketingEntitie[];
  client?:string;

  constructor(public navCtrl: NavController,private restservice:Restservice) {
 this.client=GlobalVars.getClient()
  }
  ngOnInit() {
    console.log('cool ')
   // this.getMarketic();
  }
  getMarketic(){
      console.log("point 2");
    this.restservice.getAllbranches().subscribe(Marckic =>{

          console.log('data '+Marckic)
        //Marckic= this.Marckic=Marckic;
        // var a=data.results
       //   console.log("resultat"+Marckic.url)
          ,error=>alert  (error+'erreur')
      })
    }
}
