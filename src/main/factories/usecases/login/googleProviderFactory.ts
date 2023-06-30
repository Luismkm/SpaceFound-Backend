import path from 'path';

import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';
import { EtherealAdapter } from '@/infra/emailService/ethereal/EtherealAdapter';
import { HandlebarsMailTemplateProvider } from '@/infra/emailTemplate/HandlebarsMailTemplateProvider';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { ICreateUserByGoogleProvider } from '@/domain/usecases/login/ICreateUserByGoogleProvider';
import { DbCreateUserByGoogleProvider } from '@/data/usecases/login/DbCreateUserByGoogleProvider';
import { GoogleProviderPostgresRepository } from '@/infra/database/postgres/login/GoogleProviderPostgresRepository';

const welcomeTemplateFile = path.resolve(
  __dirname,
  '../../../../infra/emailTemplate/welcomeTemplate.hbs',
);

export const makeDbGoogleProvider = (): ICreateUserByGoogleProvider => {
  const uuidAdapter = new UuidAdapter();
  const handlebarsTemplate = new HandlebarsMailTemplateProvider();
  const etherealAdapter = new EtherealAdapter(welcomeTemplateFile, handlebarsTemplate);
  const googlePostgresRepository = new GoogleProviderPostgresRepository();
  const userPostgresRepository = new UserPostgresRepository();
  return new DbCreateUserByGoogleProvider(
    uuidAdapter,
    etherealAdapter,
    googlePostgresRepository,
    userPostgresRepository,
  );
};
