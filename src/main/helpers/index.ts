import knex from 'knex';
import knexFile from '@/infra/database/helpers/knexfile';

const connection = (type: string): any => {
  if (type === 'development') {
    const db = knex({
      client: 'pg',
      connection: {
        database: 'spacefound-test',
        user: 'postgres',
        password: 'docker',
      },
      useNullAsDefault: true,
    });
    return db;
  }

  if (type === 'production') {
    const db = knex({
      client: 'pg',
      connection: {
        database: 'spacefound',
        user: 'postgres',
        password: 'docker',
      },
      useNullAsDefault: true,
    });
    return db;
  }
};

export default connection;

/* import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    database: 'spacefound',
    user: 'postgres',
    password: 'docker',
  },
  useNullAsDefault: true,
});

export default db;
 */
