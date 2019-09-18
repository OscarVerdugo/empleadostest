import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  moduleEv = new EventEmitter();

  constructor() { }

  public changeModule(name:string){
    this.moduleEv.emit(name);
  }
}
