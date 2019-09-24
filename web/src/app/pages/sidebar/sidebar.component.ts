import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormService } from "../../services/form.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() hiddenSideBar : boolean;
  @Output() hiddenEvent = new EventEmitter<boolean>();

  constructor(private c: FormService) { }

  ngOnInit() {
    this.c.init();
  }

  toggle(){
    this.hiddenEvent.emit(!this.hiddenSideBar);
  }
}
