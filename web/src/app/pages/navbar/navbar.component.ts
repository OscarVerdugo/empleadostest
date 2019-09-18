import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() hiddenSideBar:boolean;
  @Output() hiddenEvent = new EventEmitter<boolean>();
  @Input() moduleName:string;
  faAlignLeft = faAlignLeft;
  date = new Date;

  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.hiddenEvent.emit(!this.hiddenSideBar);
  }

}
