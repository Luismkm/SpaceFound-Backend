// import express { Express } from 'express';
import express, { Express } from 'express';

import uploadConfig from '@/main/config/upload';
import { bodyParser, cors } from '../middlewares';

export default (app: Express) => {
  app.use(bodyParser);
  app.use(cors);
  app.use('/files', express.static(uploadConfig.uploadsFolder));
};
