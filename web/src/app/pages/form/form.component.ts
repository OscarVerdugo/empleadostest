import { Component, OnInit} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../services/api/api.service";
import { ActivatedRoute } from '@angular/router';
import Catalogue from 'src/app/services/models/Form';
import { FormService } from "../../services/form.service";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  //Pagination
  page: number = 1;
  pageSize: number = 6;

  form: any; //form model

  model:Catalogue;
  combosStore:any = {};

  lst = [];
  filterName: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService,
    private route: ActivatedRoute,
    private forms: FormService
  ) {
  }

  ngOnInit() {
    // this.select();
    //Obtener el calogo de las route.params
    this.route.params.subscribe(p => {
      this.model = this.forms.lstForms.find(x => x.cName == p.catalogue.toString());//seleccionar el modelo
      let formConfig: {[k: string]: any} = {};
      for(let input of this.model.lstInputs){//Cargando a form los inputs
        formConfig[input.cName] = [input.aValue,Validators.required];
      }
      for(let combo of this.model.lstCombos){//Cargando a form los inputs
        formConfig[combo.cName] = [-1,Validators.min(0)];
        // let p = this.api.select('asd',1,1,combo.cTable).subscribe(data =>{
        //   this.combosStore[combo.cTable] = data;
        //   p.unsubscribe();
        // });
        this.combosStore[combo.cTable] = [];

      }
      
      this.form = this.formBuilder.group(formConfig);//agrego los campos al form
      console.log(this.form.controls);
    });

  }
  resetForm():void {
    this.form.reset();
    this.form.controls[this.model.cPrimary].setValue(null);//null para las validaciones de 'actualizar' != null y 'nuevo' == null
    // this.form.controls["estatus"].setValue(true);
  }


  openConfirmation(content, action, data) {
    let closeResult = false;
    let reason = "";
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          closeResult = result;
          if (result) {
            switch (action) {
              case "delete":
                this.delete(data);
                break;
              case "update":
                this.save();
                break;
              case "save":
                this.save();
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

  delete(emp):void {
    // this.api.deleteOne(emp.id).subscribe(data => {
      
    // });
  }

  edit(emp):void {
    // this.empleado = emp;
    // this.form.controls["id"].setValue(emp.id);
    // this.form.controls["name"].setValue(emp.nombre);
    // this.form.controls["f_lastname"].setValue(emp.primer_apellido);
    // this.form.controls["s_lastname"].setValue(emp.segundo_apellido);
    // this.form.controls["r_date"].setValue(emp.fecha_registro);
    // this.form.controls["r_user"].setValue(emp.usuario_registro);
  }

  save():void {
    if (!this.form.controls[this.model.cPrimary].value) {
      let obj:any = {};
      for(let c of Object.keys(this.form.controls)){
        obj[c] = this.form.controls[c].value;
      }
      this.api.insert(this.model.cTable,obj).subscribe(data =>{
        console.log(data);
      });
      // this.api.select(this.model.cTable,obj).subscribe(data =>{
      //     console.log(data);
      //   });
    }
  }

  select() {
    // this.api.getAll().subscribe(data => {
    //   if (data) {
    //     // this.lstEmpleados = data;
    //   }
    // });
  }

  // filterList(prop: string) {
  //   if (this.filterName != null && this.filterName.length > 0)
  //     return this.lstEmpleados.filter(
  //       x => x[prop].toLowerCase().indexOf(this.filterName.toLowerCase()) > -1
  //     );
  //   else return this.lstEmpleados;
  // }
}
