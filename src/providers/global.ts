import { Injectable } from '@angular/core';


@Injectable()
export class GlobalVars {

  private static url: any;
  private static client: any;
  private static longitude;
  private static latitude;

  public setUrl(value) {
    console.log('GlobalVars.setUrl: ' + value);
    GlobalVars.url = value;
  }
  public setClient(value) {
    console.log('GlobalVars.setClient: ' + value);
    GlobalVars.client = value;
  }
  public setLongitude(value) {
    console.log('GlobalVars.setLongitude: ' + value);
    GlobalVars.longitude = value;
  }
  public setLatitude(value) {
    console.log('GlobalVars.setLatitude: ' + value);
    GlobalVars.latitude = value;
  }

  static getUrl() {
    console.log('GlobalVars.getUrl: ' + GlobalVars.url);
    return GlobalVars.url;
  }
  static getLongitude() {
    console.log('GlobalVars.getLongitude: ' + GlobalVars.longitude);
    return GlobalVars.longitude;
  }
  static getLatitude() {
    console.log('GlobalVars.getLatitude: ' + GlobalVars.latitude);
    return GlobalVars.latitude;
  }
  static getClient() {
    console.log('GlobalVars.getClient: ' + GlobalVars.client);
    return GlobalVars.client;
  }

}
