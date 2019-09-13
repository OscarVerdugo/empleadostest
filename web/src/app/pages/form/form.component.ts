import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  lstEmpleados = [];
  form: any;
  empleado = {};
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private api: ApiService) {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      f_lastname: [null, Validators.required],
      s_lastname: [null, Validators.required],
      r_date: [new Date],
      r_user: [null, Validators.required]
    });
  }



  ngOnInit() {
    this.api.getAll().subscribe(data => {
      if(data){
        this.lstEmpleados = data;
      }
    });
  }
  limpiar() {
    console.log(this.form.controls);
    this.form.reset();
    this.form.controls['status'].setValue(true);

  }

  guardarDatos() {

  }

  openConfirmation(content, action, data) {
    let closeResult = false;
    let reason = "";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      closeResult = result;
      console.log(closeResult);
      if (result) {
        switch (action) {
          case 'delete':
              this.eliminarEmpleado(data);
            break;
          case 'update':
            this.editarEmpleado(data);
            break;
          case 'save':
            this.guardarEmpleado();
            break;
        }
      }
    }, (reason) => {
      reason = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


    eliminarEmpleado(emp){
      this.api.deleteOne(emp.id).subscribe(data =>{
        console.log(emp);
      });
      // this.api.insert(emp).subscribe(data =>{
      //     console.log(data);
      // });
    }

    editarEmpleado(emp){
      this.empleado = emp;
      this.form.controls['id'].setValue(emp.id);
      this.form.controls['name'].setValue(emp.nombre);
      this.form.controls['f_lastname'].setValue(emp.primer_apellido);
      this.form.controls['s_lastname'].setValue(emp.segundo_apellido);
      this.form.controls['r_date'].setValue(emp.fecha_registro);
      this.form.controls['r_user'].setValue(emp.usuario_registro);
    }

    guardarEmpleado(){

    }




}
