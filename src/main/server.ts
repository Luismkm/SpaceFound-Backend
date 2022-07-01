import { knexHelper } from '../infra/database/helpers/index';

knexHelper.connect('production').then(async () => {
  const app = (await import('./config/app')).default;
  app.listen(3000, () => console.log('Server running at port 3333'));
}).catch(console.error);
