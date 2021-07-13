import express from 'express';
import { KnexHelper } from './helpers/index2';

const routes = express.Router();

routes.get('/points', async (req, res) => {
  const account = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };
  const { name, email, password } = account;
  const insertedUsersIds = await KnexHelper.knex('users').insert({ name, email, password }).returning('id');
  console.log(insertedUsersIds);
  res.send('ok');
});

export default routes;
