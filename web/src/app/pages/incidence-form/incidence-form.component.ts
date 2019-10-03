import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { FormService } from "../../services/form.service";

@Component({
  selector: 'app-incidence-form',
  templateUrl: './incidence-form.component.html',
  styleUrls: ['./incidence-form.component.css']
})
export class IncidenceFormComponent implements OnInit {

  form: any;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        usuarioId: [-1, Validators.required],
        cClave: ['', Validators.required],
        subareaId:[-1,Validators.required],
        dFechaInicio:[new Date,Validators.required],
        dFechaFin:['',Validators.required],
        tipoIncidenciaId:[-1,Validators.required],
        turnoId:[-1,Validators.required],
        nEstado:[-1,Validators.required]
      });
  }

}
