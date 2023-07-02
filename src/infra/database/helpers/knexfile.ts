const knexFile = {
  development: {
    client: 'pg',
    connection: {
      database: 'spacefound-test',
      user: 'postgres',
      password: 'docker',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: 'spacefound',
      user: 'postgres',
      password: 'docker',
    },
    useNullAsDefault: true,
  },

};

export default knexFile;
