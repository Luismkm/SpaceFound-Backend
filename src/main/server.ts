import express from 'express';
import { KnexHelper } from '../infra/database/helpers/index';
/* import cors from 'cors';
import path from 'path'; */
import routes from './routes';

const app = express();
app.use(routes);

/* app.use(cors());
app.use(express.json()); */
/* KnexHelper.connect('production');

app.listen(3333, () => console.log('Server running at port 3333')); */

KnexHelper.connect('production').then(() => {
  app.listen(3333, () => console.log('Server running at port 3333'));
}).catch(console.error);
