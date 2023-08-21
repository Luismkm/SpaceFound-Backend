require('dotenv').config();

const knexFile = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DEV_DATABASE,
      user: process.env.DEV_DATABASE_USER,
      password: process.env.DEV_DATABASE_PASS,
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.PROD_DATABASE,
      user: process.env.PROD_DATABASE_USER,
      password: process.env.PROD_DATABASE_PASS,
    },
    useNullAsDefault: true,
  },

};

export default knexFile;
