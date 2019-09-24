import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  hiddenSideBar:boolean = true;
  
  ngOnInit() {
   
  }
  toggle($event){
    this.hiddenSideBar = $event;
  }

}
