import path from 'path';

import { DbCreateUserAccount } from '@/data/usecases/user/DbCreateUserAccount';
import { BcryptAdapter } from '@/infra/cryptography/bcryptAdapter/BcryptAdapter';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';
import { ICreateUserAccount } from '@/domain/usecases/user/ICreateUserAccount';
import { EtherealAdapter } from '@/infra/emailService/ethereal/EtherealAdapter';
import { HandlebarsMailTemplateProvider } from '@/infra/emailTemplate/HandlebarsMailTemplateProvider';

const welcomeTemplateFile = path.resolve(
  __dirname,
  '../../../../infra/emailTemplate/welcomeTemplate.hbs',
);

export const makeDbCreateAccount = (): ICreateUserAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const uuidAdapter = new UuidAdapter();
  const handlebarsTemplate = new HandlebarsMailTemplateProvider();
  const etherealAdapter = new EtherealAdapter(welcomeTemplateFile, handlebarsTemplate);
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbCreateUserAccount(
    bcryptAdapter,
    uuidAdapter,
    etherealAdapter,
    accountPostgresRepository,
    accountPostgresRepository,
  );
};
