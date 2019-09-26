import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Ctl_Personal extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  nIdPersonal?: number;

  @property({
    type: 'string',
    required: true,
  })
  cNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cP_Apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  cS_Apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  cNum_Empleado: string;

  @property({
    type: 'number',
    required: true,
  })
  nIdTipo_Personal: number;

  @property({
    type: 'string',
    required: true,
  })
  cContra: string;

  @property({
    type: 'boolean',
    required: true,
  })
  bAdmin: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  bEstatus: boolean;


  constructor(data?: Partial<Ctl_Personal>) {
    super(data);
  }
}

export interface Ctl_PersonalRelations {
  // describe navigational properties here
}

export type CtlPersonalWithRelations = Ctl_Personal & Ctl_PersonalRelations;
