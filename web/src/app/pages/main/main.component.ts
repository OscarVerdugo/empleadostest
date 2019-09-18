import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from "../../services/event-emitter.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _eventEmitter:EventEmitterService) { }

  hiddenSideBar:boolean = true;
  moduleName:string;
  modEv:any;
  ngOnInit() {
    this.modEv = this._eventEmitter.moduleEv.subscribe(mod => this.moduleName = mod);
  }

  ngOnDestroy(){
    this.modEv.unsubscribe();
  }

  toggle($event){
    this.hiddenSideBar = $event;
  }

  navigate($event){
    this.moduleName = $event;
  }
}
