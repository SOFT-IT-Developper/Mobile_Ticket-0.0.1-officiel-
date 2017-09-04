//import { Injectable } from '@angular/core';
//import { inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

export class StorageService{


  /**
   *
   */
  constructor(private storage:Storage) {

  }
addMum(num:any){
  console.log('set data '+num);
this.storage.set('numero',num);
}
getMum():any{
this.storage.get('numero').then(data=>{

  data=data;
  console.log(' getnum '+data);
  return data;
})
}
}
