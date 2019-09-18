import { Injectable } from '@angular/core';
//Pipes
import {  NonePipe } from "../util/none.pipe";
//Interfaces
import Input from './Input';
import  Catalogue  from './Catalogue';
import Combo from './Combo';
import Tags from './Tags';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor() { }

  lstCatalogues: Catalogue[] = [];
  

  init(){
    this.lstCatalogues.push(
      {
        cName:'turno',
        lstInputs:[
          {
            name:'descripcion',
            type:'text',
            label:'Descripción',
            pipe: NonePipe,
            pipeProps:'',
          } as Input
        ],
        lstCombos:[],
        oTags:{
          singular:'turno',
          plural:'turnos',
          title:'Turno'
        } as Tags
      } as Catalogue,
    )
  }
}
