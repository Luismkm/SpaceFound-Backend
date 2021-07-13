import knex, { Knex } from 'knex';
import knexFile from '../../infra/database/helpers/knexfile';

export const KnexHelper = {
  knex: null as Knex,
  type: null as string,

  async connect(type: string): Promise<void> {
    this.type = type;
    this.knex = knex(knexFile[type as 'development' | 'production']);
  },
};
