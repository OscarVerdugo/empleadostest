import { Component, OnInit} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../services/api.service";
import { EventEmitterService } from "../../services/event-emitter.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  lstEmpleados = [];
  form: any;
  empleado = {};
  page: number = 1;
  pageSize: number = 6;
  filterName: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService,
    private _eventEmitter: EventEmitterService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      f_lastname: [null, Validators.required],
      s_lastname: [null, Validators.required],
      r_date: [new Date()],
      r_user: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.select();
    setTimeout(()=>{
      this._eventEmitter.changeModule('Empleados');
    },500);

    this.route.params.subscribe(data =>{
      console.log(data);
    })
  }
  limpiar() {
    console.log(this.form.controls);
    this.form.reset();
    this.form.controls["id"].setValue(null);
    this.form.controls["r_date"].setValue(new Date());
  }


  openConfirmation(content, action, data) {
    let closeResult = false;
    let reason = "";
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          closeResult = result;
          console.log(closeResult);
          if (result) {
            switch (action) {
              case "delete":
                this.eliminarEmpleado(data);
                break;
              case "update":
                this.guardarEmpleado();
                break;
              case "save":
                this.guardarEmpleado();
                break;
            }
          }
        },
        reason => {
          reason = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  eliminarEmpleado(emp) {
    this.api.deleteOne(emp.id).subscribe(data => {
      console.log(data);
      if (!data["bError"]) {
        let i = this.lstEmpleados.findIndex(x => x.id == emp.id);
        if (i != -1) this.lstEmpleados[i].estatus = false;
      }
    });
  }

  editarEmpleado(emp) {
    this.empleado = emp;
    this.form.controls["id"].setValue(emp.id);
    this.form.controls["name"].setValue(emp.nombre);
    this.form.controls["f_lastname"].setValue(emp.primer_apellido);
    this.form.controls["s_lastname"].setValue(emp.segundo_apellido);
    this.form.controls["r_date"].setValue(emp.fecha_registro);
    this.form.controls["r_user"].setValue(emp.usuario_registro);
  }

  guardarEmpleado() {
    if (!this.form.controls["id"].value) {
      //guardar
      this.api
        .insert(
          this.form.controls["name"].value,
          this.form.controls["f_lastname"].value,
          this.form.controls["s_lastname"].value,
          this.form.controls["r_date"].value,
          this.form.controls["r_user"].value
        )
        .subscribe(d => {
          if (!d["bError"]) {
            this.select();
          }
        });
    } else {
      //actualizar
      this.api
        .update(
          this.form.controls["id"].value,
          this.form.controls["name"].value,
          this.form.controls["f_lastname"].value,
          this.form.controls["s_lastname"].value,
          this.form.controls["r_date"].value,
          this.form.controls["r_user"].value
        )
        .subscribe(d => {
          console.log(d);
          this.select();
        });
    }
  }

  select() {
    this.api.getAll().subscribe(data => {
      if (data) {
        this.lstEmpleados = data;
      }
    });
  }

  filterList(prop: string) {
    if (this.filterName != null && this.filterName.length > 0)
      return this.lstEmpleados.filter(
        x => x[prop].toLowerCase().indexOf(this.filterName.toLowerCase()) > -1
      );
    else return this.lstEmpleados;
  }
}
