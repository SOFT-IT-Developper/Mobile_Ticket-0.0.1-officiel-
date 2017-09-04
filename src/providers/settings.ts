import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Settings {

  private theme: BehaviorSubject<String>;

    constructor() {
      this.theme = new BehaviorSubject('default');
      // this.theme = new BehaviorSubject('mtn');
      // this.theme = new BehaviorSubject('moov');

    }

    setActiveTheme(val) {
        this.theme.next(val);
    }

    getActiveTheme() {
        return this.theme.asObservable();
    }
}
