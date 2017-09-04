import { GlobalConstant } from './constants';
import { GlobalVars } from './global';
import { VisitStatusEntity } from './../app/entitie/visit-status.entity';
import {Injectable }from '@angular/core'
import {Http }from '@angular/http'
import {Observable }from 'rxjs/Observable';
import {Headers, RequestOptions }from '@angular/http';
import {Storage }from '@ionic/storage';
import 'rxjs/Rx'
import 'rxjs/add/operator/timeout';


@Injectable()
export class Restservice {

  public http:any;
  //signature:string = "b903de146a3764e2141c464713212606"
  baseUrl:String;
  headers:any;
  //urlAdminServeur:string;
  option:any;
  constructor(http:Http, private storage:Storage) {
  //Entete des requet emit vers l'api getway
    this.headers = new Headers();
    console.log("point 1");
    this.headers.append("accept", "application/json");
    this.headers.append("Content-Type", "application/json");
    this.headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    this.option = new RequestOptions({ headers: this.headers });
   this.baseUrl=GlobalVars.getUrl();
    console.log("Restservice.construtor: " +this.baseUrl);
    //this.urlAdminServeur="http://192.168.0.137:8080/webAdmin/api/clients/sign/";
    this.http = http;
   // this.baseUrl = 'http://192.168.0.137:9090/MobileTicket/';
   // this.baseUrl = '/api/';
  }




  /**Recuperer les branches */
  getAllbranches() {
    console.log("getbranche url: "+this.baseUrl + "branches/?longitude=0&latitude=0&radius=2147483647")
    return this.http.get(this.baseUrl + "branches/?longitude=0&latitude=0&radius=2147483647", this.option).timeout(3000)
    .map(res => res.json());
  }
  /**Recuperer les branches avec la geolocalisation et du me */
  getBranchesWithLocation(long,lat,raidus=0) {
    //verifier si la geolocalisation a echoue
    if(long==0 && lat==0){
      raidus=0;
    }
    console.log(`getbranche url: ${this.baseUrl}branches/?longitude=${long}&latitude=${lat}&radius=${raidus}`)
    // return this.http.get(this.baseUrl + "branches/?longitude="+long+"&latitude="+lat+"&radius="+raidus, this.option).map(res => res.json());
    return this.http.get(`${this.baseUrl}branches/?longitude=${long}&latitude=${lat}&radius=${raidus}`, this.option)
      .timeout(GlobalConstant.URL_TIMEOUT)
      .map(res => res.json());
  }

//recuperation de la position du client
  getAdresse(adr) {
    console.log('getAdresse ' + adr);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + adr + '&key=AIzaSyCv-q1pzWPUy3vH_wHgsT1PxOJo6htg3uc';
    var response = this.http.get(url).map(res => res.json());
    console.log('getAdresse url  ' + url);
    return response;
  }
  /** service des branches */
  getServiceFromBranche(id) {
    console.log("get service from branche url {}"+this.baseUrl + "branches/" + id + "/services/wait-info")
    return this.http.get(this.baseUrl + "branches/" + id + "/services/wait-info",this.option)
      .timeout(GlobalConstant.URL_TIMEOUT)
      .map(res => res.json());
  }
  /**creer visite */
  creatvisit(idser, idbr) {
    console.log("creat visite url {}"+this.baseUrl + "services/" + idser + "/branches/" + idbr + "/ticket/issue")
    return this.http.post(this.baseUrl + "services/" + idser + "/branches/" + idbr + "/ticket/issue", {}, this.option)
      .timeout(GlobalConstant.URL_TIMEOUT)
      .map(res => res.json());
  }

  /** etat de la visite  */
  getcurentvisitstat(branchIdVal, visitIdVal, checksum): Promise<VisitStatusEntity> {
    console.log("get visite state url {}"+this.baseUrl + "MyVisit/CurrentStatus/branches/" + branchIdVal + "/visits/" + visitIdVal + "?checksum=" + checksum)

    const url = this.baseUrl + "MyVisit/CurrentStatus/branches/" + branchIdVal + "/visits/" + visitIdVal + "?checksum=" + checksum;
    return this.http.get(url, this.option)
      .timeout(GlobalConstant.URL_TIMEOUT)
      .toPromise()
      .then(response => response.json() as VisitStatusEntity)
     // .catch(error => console.log('Une erreur est survenue ' + error))
  }

  //Annuler la visite
  cancelvisit(branchIdVal, visitIdVal, checksum): Promise<any> {
    console.log("cancel visite url {}"+this.baseUrl + "branches/" + branchIdVal + "/ticket/" + visitIdVal + "?checksum=" + checksum)
    const url = this.baseUrl + "branches/" + branchIdVal + "/ticket/" + visitIdVal + "?checksum=" + checksum;
    return this.http.delete(url, this.option)
      .timeout(GlobalConstant.URL_TIMEOUT)
      .toPromise()
      .then(response => response.json())
      .catch(error => console.log('Une erreur est survenue ' + error))
  }

/**
 *
 * @param error gestion d'erreur
 */
  handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
