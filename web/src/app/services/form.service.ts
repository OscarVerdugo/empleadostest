import { Injectable } from '@angular/core';
//Pipes
import {  NonePipe } from "../util/none.pipe";
//Interfaces
import Input from './models/Input';
import  Form  from './models/Form';
import Combo from './models/Combo';
import Tags from './models/Tags';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  lstForms: Form[] = [];
  

  init(){
    this.lstForms.push(
      {
        cName:'turno',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-user-clock',
        bAdmin:true,
        lstInputs:[
          {
            cName:'cDescripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[],
        oTags:{
          cSingular:'turno',
          cPlural:'turnos',
          cTitle:'Turnos',
          cEnd:'o'
        } as Tags
      } as Form,
      {
        cName:'areas',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-building',
        bAdmin:true,
        lstInputs:[
          {
            cName:'cDescripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[],
        oTags:{
          cSingular:'area',
          cPlural:'areas',
          cTitle:'Areas',
          cEnd:'a'
        } as Tags
      } as Form,
    )
  }
}
