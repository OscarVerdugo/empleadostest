import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Ctl_Personal } from '../models';
import { Ctl_PersonalRepository } from '../repositories';

export class Ctl_PersonalController {
  constructor(
    @repository(Ctl_PersonalRepository)
    public ctl_PersonalRepository: Ctl_PersonalRepository,
  ) { }

  @post('/ctl-personals', {
    responses: {
      '200': {
        description: 'CtlPersonal model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Ctl_Personal) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ctl_Personal, {
            title: 'NewCtlPersonal',
            exclude: ['nIdPersonal'],
          }),
        },
      },
    })
    ctl_Personal: Omit<Ctl_Personal, 'nIdPersonal'>,
  ): Promise<Ctl_Personal> {
    return this.ctl_PersonalRepository.create(ctl_Personal);
  }

  @get('/ctl-personals/count', {
    responses: {
      '200': {
        description: 'CtlPersonal model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ctl_Personal)) where?: Where<Ctl_Personal>,
  ): Promise<Count> {
    return this.ctl_PersonalRepository.count(where);
  }

  @get('/ctl-personals', {
    responses: {
      '200': {
        description: 'Array of CtlPersonal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Ctl_Personal) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ctl_Personal)) filter?: Filter<Ctl_Personal>,
  ): Promise<Ctl_Personal[]> {
    return this.ctl_PersonalRepository.find(filter);
  }

  @patch('/ctl-personals', {
    responses: {
      '200': {
        description: 'CtlPersonal PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ctl_Personal, { partial: true }),
        },
      },
    })
    ctl_Personal: Ctl_Personal,
    @param.query.object('where', getWhereSchemaFor(Ctl_Personal)) where?: Where<Ctl_Personal>,
  ): Promise<Count> {
    return this.ctl_PersonalRepository.updateAll(ctl_Personal, where);
  }

  @get('/ctl-personals/{id}', {
    responses: {
      '200': {
        description: 'CtlPersonal model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Ctl_Personal) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Ctl_Personal> {
    return this.ctl_PersonalRepository.findById(id);
  }

  @patch('/ctl-personals/{id}', {
    responses: {
      '204': {
        description: 'CtlPersonal PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ctl_Personal, { partial: true }),
        },
      },
    })
    ctl_Personal: Ctl_Personal,
  ): Promise<void> {
    await this.ctl_PersonalRepository.updateById(id, ctl_Personal);
  }

  @put('/ctl-personals/{id}', {
    responses: {
      '204': {
        description: 'CtlPersonal PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ctl_Personal: Ctl_Personal,
  ): Promise<void> {
    await this.ctl_PersonalRepository.replaceById(id, ctl_Personal);
  }

  @del('/ctl-personals/{id}', {
    responses: {
      '204': {
        description: 'CtlPersonal DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ctl_PersonalRepository.deleteById(id);
  }
}
