import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { faAmbulance,faUserFriends,faAngry } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faAmbulance = faAmbulance;
  faUserFriends = faUserFriends;
  faAngry = faAngry;
  @Input() hiddenSideBar : boolean;
  @Output() hiddenEvent = new EventEmitter<boolean>();

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

  toggle(){
    this.hiddenEvent.emit(!this.hiddenSideBar);
  }

}
