import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api/api.service";
import { EstadoPipe } from "../../util/estado-pipe.pipe";
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-incidences',
  templateUrl: './view-incidences.component.html',
  styleUrls: ['./view-incidences.component.css']
})
export class ViewIncidencesComponent implements OnInit {

  bMisIncidencias:boolean = true;
  cNumEmp:string = "";
  nTipoUsuario:number = 0;
  lstIncidencias = [];
  constructor(private api:ApiService, private router: Router) { }

  ngOnInit() {
    this.cNumEmp = localStorage.getItem("HCC:NumeroEmpleado");
    this.api.selectIncidenciasEmp(this.cNumEmp).subscribe(data =>{
      if(data){
        this.lstIncidencias = data;
      }
    });
  }


  verIncidencia(id:number){
    this.router.navigate([`auth/incidence/${id}`]);
  }

}
