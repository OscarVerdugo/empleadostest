import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {



  form: any;
  empleado = {};
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      f_lastname: [null, Validators.required],
      s_lastname: [null, Validators.required],
      r_date: [new Date],
      r_user: [null, Validators.required],
      status: [true, Validators.required]
    });
  }



  ngOnInit() {

  }
  limpiar() {
    console.log(this.form.controls);
    this.form.reset();

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

    }

    editarEmpleado(emp){

    }

    guardarEmpleado(){

    }




}
