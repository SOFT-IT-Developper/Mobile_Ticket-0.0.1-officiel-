import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MobileServer{
  /**
   *
   */
  constructor(private http:Http) {

  }

  getApiGetWayInfo() {
    let headers = new Headers();
    console.log("get url api getway");
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTQ5OTUwNTg2MH0.od3FxqKSR6SHD9q3I3tZKOr90ZN5udLUgiVSBHnc4F6h-p8rjTwrF_6e2raE_b20j1i2_zByJjBBJeBhlBYOOA");

    var signature = "b903de146a3764e2141c464713212606"
    var urlMobileServer="http://192.168.0.137:8080/webAdmin/api/clients/sign/";
    var option = new RequestOptions({ headers: headers });
    return this.http.get(urlMobileServer + signature, option).map(res => res.json());
    //return this.http.get(this.urlAdminServeur + this.signature, option).map(res => res.json());
  }
}
