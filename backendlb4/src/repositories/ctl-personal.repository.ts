import { DefaultCrudRepository } from '@loopback/repository';
import { Ctl_Personal, Ctl_PersonalRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class Ctl_PersonalRepository extends DefaultCrudRepository<
  Ctl_Personal,
  typeof Ctl_Personal.prototype.nIdPersonal,
  Ctl_PersonalRelations
  > {
  constructor(
    @inject('datasources.mssql') dataSource: MssqlDataSource,
  ) {
    super(Ctl_Personal, dataSource);
  }
}
