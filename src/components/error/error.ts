import { Component, EventEmitter, Output } from '@angular/core';

/*
  Generated class for the Error component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'error',
  templateUrl: 'error.html'
})
export class ErrorComponent {
@Output() reload=new EventEmitter();
  text: string;

  constructor() {
    console.log('Hello Error Component');
    this.text = 'Hello World';

  }
ngAfterViewInit() {
   this.reload.emit();
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.

}
}
