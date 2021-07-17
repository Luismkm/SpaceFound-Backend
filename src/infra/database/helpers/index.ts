import knex, { Knex } from 'knex';
import knexFile from './knexfile';

export const knexHelper = {
  knex: null as Knex,
  type: null as string,

  async connect(type: string): Promise<void> {
    this.type = type;
    this.knex = knex(knexFile[type as 'development' | 'production']);
  },
};
