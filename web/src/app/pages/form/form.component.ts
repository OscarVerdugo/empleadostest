import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../services/api/api.service";
import { ActivatedRoute } from "@angular/router";
import Catalogue from "src/app/services/models/Form";
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

  model: Catalogue;
  combosStore: any = {};

  bAlertPresent: boolean = false;
  cAlertMessage: string = "";
  cAlertClass: string = "";

  lst = [];
  filterName: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService,
    private route: ActivatedRoute,
    private forms: FormService
  ) {}

  ngOnInit() {
    // this.select();
    //Obtener el calogo de las route.params
    this.route.params.subscribe(p => {
    this.lst = [];

      this.model = this.forms.lstForms.find(
        x => x.cName == p.catalogue.toString()
      ); //seleccionar el modelo
      let formConfig: { [k: string]: any } = {};
      for (let input of this.model.lstInputs) {
        //Cargando a form los inputs
        formConfig[input.cName] = [input.aValue, Validators.required];
      }
      for (let combo of this.model.lstCombos) {
        //Cargando a form los inputs
        formConfig[combo.cName] = [-1, Validators.min(0)];
        let p = this.api.select(combo.cTable).subscribe(data => {
          this.combosStore[combo.cTable] = data;
          p.unsubscribe();
        });
        this.combosStore[combo.cTable] = [];
      }
      let ob = this.api.select(this.model.cTable).subscribe(data => {
        if (data) this.lst = data;
        ob.unsubscribe();
      });
      this.form = this.formBuilder.group(formConfig); //agrego los campos al form
    });
  }

  resetForm(): void {
    this.form.reset();
    this.form.controls[this.model.cPrimary].setValue(-1); //null para las validaciones de 'actualizar' != null y 'nuevo' == null
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

  delete(obj): void {
    this.api
      .delete(this.model.cTable, obj[this.model.cPrimary])
      .subscribe(data => {
        if (!data["bError"]) {
          this.cAlertClass = "alert-success";
          this.cAlertMessage =
             this.model.oTags.cSingular + " elimina"+this.model.oTags.cEnd+ " exitosamente !!";
             try{
               let i = this.lst.findIndex(x => x[this.model.cPrimary] == obj[this.model.cPrimary]);
               if(i >= 0){
                 this.lst.splice(i,1);
               }
             }catch(er){
               console.log(er);
             }
        } else {
          this.cAlertClass = "alert-danger";
          this.cAlertMessage =
            "Error al eliminar " + this.model.oTags.cSingular + " !!";
        }
      },
      err =>{
        console.log(err);
      });
    this.bAlertPresent = true;
    setTimeout(() => {
      this.bAlertPresent = false;
    }, 1000);
  }

  edit(obj): void {
    this.resetForm();
    try {
      for (let p of this.model.lstInputs) {
        this.form.controls[p.cName]  ? this.form.controls[p.cName].setValue(obj[p.cName]) : null;
      }
      for(let c of this.model.lstCombos){
        this.form.controls[c.cName] ? this.form.controls[c.cName].setValue(obj[c.cName]): null;
      }
    } catch (e) {
      console.log(e);
    }
    console.log(this.form.controls);
    console.log(obj);
  }

  save(): void {
    let obj: any = {};
    for (let c of Object.keys(this.form.controls)) {
      obj[c] = this.form.controls[c].value;
    }
    if (this.form.controls[this.model.cPrimary].value < 0) {
      //new
      this.api.insert(this.model.cTable, obj).subscribe(
        data => {
          if (!data["bError"]) {
            //error false
            this.cAlertClass = "alert-success";
            this.cAlertMessage =
              "Registro de " + this.model.oTags.cSingular + " exitoso !!";

            obj[this.model.cPrimary] = data["nPayload"]; //Inserted primary key

            this.lst.unshift(obj);
            this.resetForm();
          } else {
            this.cAlertClass = "alert-danger";
            this.cAlertMessage =
              "Registro de " + this.model.oTags.cSingular + " fallido !!";
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //Edit
      this.api.update(this.model.cTable, obj).subscribe(
        data => {
          if (!data["bError"]) {
            this.cAlertClass = "alert-success";
            this.cAlertMessage =
              "Registro de " + this.model.oTags.cSingular + " exitoso !!";
            try {
              let i = this.lst.findIndex(
                x => x[this.model.cPrimary] == obj[this.model.cPrimary]
              );
              if (i >= 0) {
                this.lst[i] = obj;
              }
            } catch (er) {
              console.log(er);
            }
            this.resetForm();
          } else {
            this.cAlertClass = "alert-danger";
            this.cAlertMessage =
              "Modificación de " + this.model.oTags.cSingular + " fallida !!";
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    this.bAlertPresent = true;
    setTimeout(() => {
      this.bAlertPresent = false;
    }, 1000);
  }

  ex() {
    console.log(this.lst);

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
