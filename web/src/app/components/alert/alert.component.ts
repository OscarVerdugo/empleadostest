import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition} from "@angular/animations";
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  animations: [
    trigger('hideShowAnimator', [
        state('true' , style({ opacity: 1 })), 
        state('false', style({ opacity: 0 })),
        transition('0 => 1', animate('.3s')),
        transition('1 => 0', animate('.9s'))
    ])
  ],
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() bPresent:boolean = false;
  @Input() cMessage:string = "";
  @Input() cClass:string = "alert-success";


  constructor() { }

  ngOnInit() {
  }


}
