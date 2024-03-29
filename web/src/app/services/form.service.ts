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
    this.lstForms = [
      {
        cName:'turno',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-user-clock',
        bAdmin:true,
        cTable:'Turnos',
        cPrimary:'turnoId',
        lstInputs:[
          {
            cName:'turnoId',
            cType:'hidden',
            aValue:-1,
            cLabel:'ID',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,{
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
        cTable:'Subareas',
        cPrimary:'subareaId',
        lstInputs:[
          {
            cName:'subareaId',
            cType:'hidden',
            aValue:-1,
            cLabel:'ID',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
          {
            cName:'cDescripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[
          {
            cTable:'Areas',
            cDisplay:'cDescripcion',
            cLabel: 'Area',
            cName: 'areaId'
          } as Combo],
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
        cTable:'TiposPersonal',//nms

        cPrimary:'tipoPersonalId',
        lstInputs:[
          {
            cName:'tipoPersonalId',
            cType:'hidden',
            aValue:-1,
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
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
          cSingular:'tipo de personal',
          cPlural:'tipos de personal',
          cTitle:'Tipos de Personal',
          cEnd:'o'
        } as Tags,
        iBuscable:1,
      } as Form,
      {
        cName:'tipoUsuario',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-exclamation',
        bAdmin:true,
        cTable:'TipoUsuarios',//nms

        cPrimary:'tipoUsuarioId',
        lstInputs:[
          {
            cName:'tipoUsuarioId',
            cType:'hidden',
            aValue:-1,
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
          {
            cName:'cDescripcion',
            cType:'text',
            aValue:'',
            cLabel:'Descripción',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
          {
            cName:"nEstadoAsignado",
            cType:'number',
            aValue:'',
            cLabel:'Estado asignado',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[],
        oTags:{
          cSingular:'tipo de usuario',
          cPlural:'tipos de usuarios',
          cTitle:'Tipos de Usuarios',
          cEnd:'o'
        } as Tags,
        iBuscable:1,
      } as Form,
      {
        cName:'tipoIncidentes',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-building',
        bAdmin:true,
        cTable:'TipoIncidentes',
        cPrimary:'tipoIncidenteId',
        lstInputs:[
          {
            cName:'tipoIncidenteId',
            cType:'hidden',
            aValue:-1,
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
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
        ],
        lstCombos:[],
        oTags:{
          cSingular:'tipo de incidente',
          cPlural:'tipos de incidentes',
          cTitle:'Tipos de Incidentes',
          cEnd:'o'
        } as Tags,
        iBuscable:1,
      } as Form,
      {
        cName:'usuarios',//------------------------------------------------------------------------------------------------
        cIcon:'fa fa-building',
        bAdmin:true,
        cTable:'Usuarios',
        cPrimary:'usuarioId',
        lstInputs:[
          {
            cName:'usuarioId',
            cType:'hidden',
            aValue:-1,
            cLabel:'',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,
          {
            cName:'cNombres',
            cType:'text',
            aValue:'',
            cLabel:'Nombres',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,
          {
            cName:'cPApellido',
            cType:'text',
            aValue:'',
            cLabel:'Primer Apellido ',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,
          {
            cName:'cSApellido',
            cType:'text',
            aValue:'',
            cLabel:'Segundo Apellido',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input,
          {
            cName:'cContra',
            cType:'password',
            aValue:'',
            cLabel:'Contraseña',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
          ,
          {
            cName:'cNumeroEmpleado',
            cType:'text',
            aValue:'',
            cLabel:'Num. Empleado',
            oPipe: NonePipe,
            cPipeProps:'',
          } as Input
        ],
        lstCombos:[
          {
            cTable:'TipoUsuarios',
            cDisplay:'cDescripcion',
            cLabel: 'Tipo de Usuario',
            cName: 'tipoUsuarioId'
          } as Combo,
          {
            cTable:'TiposPersonal',
            cDisplay:'cDescripcion',
            cLabel: 'Tipo de Personal',
            cName: 'tipoPersonalId'
          } as Combo
        ],
        oTags:{
          cSingular:'usuario',
          cPlural:'usuarios',
          cTitle:'Usuarios',
          cEnd:'o'
        } as Tags,
        iBuscable:1,
      } as Form
    ];
  }
}
