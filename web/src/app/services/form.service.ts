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
        } as Tags,
        iBuscable:0,
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
          cSingular:'área',
          cPlural:'áreas',
          cTitle:'Áreas',
          cEnd:'a'
        } as Tags,
        iBuscable:0,
      } as Form,
      {
        cName:'subareas',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-flag',
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
          cSingular:'subárea',
          cPlural:'subáreas',
          cTitle:'Subáreas',
          cEnd:'a'
        } as Tags,
        iBuscable:0,
      } as Form ,
      {
        cName:'incidencias',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-exclamation',
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
          cSingular:'incidencia',
          cPlural:'incidencias',
          cTitle:'Incidencias',
          cEnd:'a'
        } as Tags,
        iBuscable:0,
      } as Form
    )
  }
}
