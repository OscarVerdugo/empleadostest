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
        cTable:'Turnos',
        cPrimary:'TurnoId',
        lstInputs:[
          {
            cName:'TurnoId',
            cType:'hidden',
            aValue:'',
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,{
            cName:'Descripcion',
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
        iBuscable:1,
      } as Form,
      {
        cName:'areas',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-building',
        bAdmin:true,
        cTable:'Areas',
        cPrimary:'areaId',
        lstInputs:[
          {
            cName:'areaId',
            cType:'hidden',
            aValue:-1,
            cLabel:'ID',
            oPipe: NonePipe,
            cPipeProps:''
          } as Input
          ,
          {
            cName:'cDescripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          // {
          //   cName:'bEstatus',
          //   cType:'hidden',
          //   aValue:true,
          //   cLabel:'Descripción',
          //   oPipe: NonePipe,
          //   cPipeProps:'',
          // } as Input
        ],
        lstCombos:[],
        oTags:{
          cSingular:'área',
          cPlural:'áreas',
          cTitle:'Áreas',
          cEnd:'a'
        } as Tags,
        iBuscable:1,
      } as Form,
      {
        cName:'subareas',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-flag',
        bAdmin:true,
        cTable:'SubAreas',
        cPrimary:'SubAreaId',
        lstInputs:[
          {
            cName:'SubAreaId',
            cType:'hidden',
            aValue:'',
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
          {
            cName:'Descripcion',
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
        iBuscable:1,
      } as Form ,
      {
        cName:'tipoPersonal',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-exclamation',
        bAdmin:true,
        cTable:'TipoPersonals',//nms

        cPrimary:'TipoPersonalId',
        lstInputs:[
          {
            cName:'TipoPersonalId',
            cType:'hidden',
            aValue:'',
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
          {
            cName:'Descripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[{
          cName:'nIdSubArea',
          cTable:'SubAreas',
          cLabel:'SubArea',
          cDisplay:'Descripcion'
        } as Combo],
        oTags:{
          cSingular:'tipo de personal',
          cPlural:'tipos de personal',
          cTitle:'Tipos de Personal',
          cEnd:'o'
        } as Tags,
        iBuscable:1,
      } as Form,
      {
        cName:'tipoIncidentes',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-building',
        bAdmin:true,
        cTable:'TipoIncidentes',
        cPrimary:'IncidenteId',
        lstInputs:[
          {
            cName:'IncidenteId',
            cType:'hidden',
            aValue:'',
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,
          {
            cName:'Descripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[],
        oTags:{
          cSingular:'tipo de incidente',
          cPlural:'tipos de incidentes',
          cTitle:'Tipos de Incidentes',
          cEnd:'o'
        } as Tags,
        iBuscable:1,
      } as Form
    )
  }
}
