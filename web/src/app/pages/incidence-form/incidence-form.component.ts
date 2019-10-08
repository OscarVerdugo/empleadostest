import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { FormService } from "../../services/form.service";
import { ApiService } from "../../services/api/api.service";
import {NgbDate, NgbCalendar,} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-incidence-form',
  templateUrl: './incidence-form.component.html',
  styleUrls: ['./incidence-form.component.css']
})
export class IncidenceFormComponent implements OnInit {
  
  dF:Date;

  form: any;
  cNombre:string = "";
  cNumeroEmpleado:string = "";
  combosStore:any = {};
  incidenciaView = undefined;
  
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
   

    
    
  }

  ngOnInit() {
    let edit:boolean = false;
    this.form = this.formBuilder.group(
      {
        incidenciaId:[-1,Validators.required],
        cNumeroEmpleado: ["", Validators.required],
        dFechaRegistro:[{value: new Date, disabled: edit}],
        dFechaInicio:[{value: '', disabled: edit},Validators.required],
        dFechaFin:[{value: '', disabled: edit},Validators.required],
        dFechaLaborar:[{value: '', disabled:edit},Validators.required],
        tipoIncidenteId:[{value: -1, disabled: edit},[Validators.required,Validators.min(0)]],
        turnoId:[{value: -1, disabled:edit},[Validators.required,Validators.min(0)]],
        nEstado:[{value: 0, disabled: edit},Validators.required],
        cComentario:[{value: '', disabled: edit}]
      });

    console.log(this.form.controls['dFechaFin'].disabled);
    this.incidenciaView = undefined;

    this.route.params.subscribe(p =>{
      if(p['incidenciaId']){
        edit = true;
        this.api.selectIncidencia(p['incidenciaId']).subscribe(data => {
          if(data) this.incidenciaView = data;
          if(data['nEstado'] == 0) edit = false;
        });
      }
    });

    

    this.cNombre = localStorage.getItem('HCC:Nombre') + " " + localStorage.getItem('HCC:PApellido') + " " + localStorage.getItem('HCC:SApellido');
    let cNumEmp = localStorage.getItem("HCC:NumeroEmpleado");
    this.cNumeroEmpleado = cNumEmp;
    this.form.controls['cNumeroEmpleado'].setValue(cNumEmp);
    

      this.api.select('TipoIncidentes').subscribe(data => {
        this.combosStore['TipoIncidentes'] = data;
        this.combosStore['TipoIncidentes'].unshift({cDescripcion:"Seleccionar...",tipoIncidenteId:-1});
      });
      this.api.select('Turnos').subscribe(data => {
        this.combosStore['Turnos'] = data;
        this.combosStore['Turnos'].unshift({cDescripcion:"Seleccionar...",turnoId:-1});
      });
      console.log(this.incidenciaView);
     if(this.incidenciaView){
       for(let prop of this.form.controls){
         console.log("hoal");
       }
     }

  }

  guardar(){
    if(this.form.controls['incidenciaId'].value > 0){

    }else{
      if(this.validarFechas()){
        let obj = {
          dFechaRegistro:this.form.controls['dFechaRegistro'].value,
          dFechaInicio:this.fInicio,
          dFechaFinal:this.fFin,
          tipoIncidenteId:this.form.controls['tipoIncidenteId'].value,
          turnoId:this.form.controls['turnoId'].value,
          cComentario:this.form.controls['cComentario'].value
        };
        this.api.insertIncidencia(obj,this.form.controls['cNumeroEmpleado'].value).subscribe(data =>{
          console.log(data);
          if(!data['bError']){
            this.resetForm();
            this.alerta('Permiso registrado con éxito!',true);
          }else{ 
            this.alerta('Error al registrar permiso!',false);

          }
        });
      }else{
        this.alerta("Verficiar fechas!",false);
      }
    }
  }

  
  fInicio:Date;
  fFin:Date;
  fLaborar:Date;
  validarFechas():boolean{
    let fechaInicio = this.form.controls['dFechaInicio'].value;
    let fechaFin = this.form.controls['dFechaFin'].value;
    let fechaLaborar = this.form.controls['dFechaLaborar'].value;
    this.fInicio = this.getDate(fechaInicio.year,fechaInicio.month,fechaInicio.day);
    this.fFin = this.getDate(fechaFin.year,fechaFin.month,fechaFin.day);
    this.fLaborar = this.getDate(fechaLaborar.year,fechaLaborar.month,fechaLaborar.day);
    if(( this.fInicio &&  this.fFin && this.fLaborar) && ( this.fInicio <  this.fFin) && ( this.fFin < this.fLaborar)){
      return true;
    }else{
      return false;
    }

  }

  bAlertPresent:boolean = false;
  cAlertMessage:string = "";
  cAlertClass:string ="alert-success";
  alerta(msg:string,positive:boolean){
    this.cAlertClass = (positive)? 'alert-success':'alert-danger';
    this.cAlertMessage = msg;
    this.bAlertPresent = true;
    setTimeout(()=>{
      this.bAlertPresent = false;
    },3000)
  }



  getDate(y:number,m:number,d:number):Date{
    let date:Date= new Date();
    date.setFullYear(y);
    date.setMonth(m-1);
    date.setDate(d);
    return date;
  }

  resetForm(){
    this.form.reset();
    this.form.controls['tipoIncidenteId'].setValue(-1);
    this.form.controls['turnoId'].setValue(-1);
  }

  fromChange(){
    this.fromDate = this.form.controls['dFechaInicio'].value;
  }

  toChange(){
    this.toDate = this.form.controls['dFechaFin'].value;
  }
  





  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.form.controls['dFechaInicio'].setValue(this.fromDate);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.form.controls['dFechaFin'].setValue(this.toDate);
    } else {
      this.form.controls['dFechaFin'].setValue(null);
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
