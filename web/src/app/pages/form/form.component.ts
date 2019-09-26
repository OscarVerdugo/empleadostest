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
  combos:any = {};

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
      formConfig['id'] = [null,Validators.required];//estos van de cincho
      formConfig['estatus'] = [true,Validators.required];//estos van de cincho

      this.form = this.formBuilder.group(formConfig);//agrego los campos al form

      for(let cb of this.model.lstCombos){
        this.api.select("token",1,2,this.model.cName).subscribe(lst =>{
          this.combos[this.model.cName] = lst.data; //todo
        });
      }
    });
  }
  resetForm():void {
    this.form.reset();
    this.form.controls["id"].setValue(null);//null para las validaciones de 'actualizar' != null y 'nuevo' == null
    this.form.controls["estatus"].setValue(true);
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
    if (!this.form.controls["id"].value) {
      //guardar
    //   this.api
    //     .insert(
    //       this.form.controls["name"].value,
    //       this.form.controls["f_lastname"].value,
    //       this.form.controls["s_lastname"].value,
    //       this.form.controls["r_date"].value,
    //       this.form.controls["r_user"].value
    //     )
    //     .subscribe(d => {
    //       if (!d["bError"]) {
    //         this.select();
    //       }
    //     });
    // } else {
    //   //actualizar
    //   this.api
    //     .update(
    //       this.form.controls["id"].value,
    //       this.form.controls["name"].value,
    //       this.form.controls["f_lastname"].value,
    //       this.form.controls["s_lastname"].value,
    //       this.form.controls["r_date"].value,
    //       this.form.controls["r_user"].value
    //     )
    //     .subscribe(d => {
    //       console.log(d);
    //       this.select();
    //     });
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
