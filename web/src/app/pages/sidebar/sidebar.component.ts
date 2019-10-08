import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormService } from "../../services/form.service";
import { AuthService } from "../../services/authentication/auth.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() hiddenSideBar : boolean;
  @Output() hiddenEvent = new EventEmitter<boolean>();

  lstC = [];
  cNombre:string = "";
  constructor(private c: FormService, private auth: AuthService) { }

  ngOnInit() {
    this.cNombre = localStorage.getItem("HCC:Nombre") + " " + localStorage.getItem("HCC:PApellido");
    this.auth.isAdmin().then(data =>{
      if(!data['bError']){
        this.c.init();
        this.lstC = this.c.lstForms;
      }
    });
  }

  toggle(){
    this.hiddenEvent.emit(!this.hiddenSideBar);
  }
}
