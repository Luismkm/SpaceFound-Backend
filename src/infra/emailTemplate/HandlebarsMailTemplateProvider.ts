import fs from 'fs';
import handlebars from 'handlebars';

import { IUserData } from '@/data/protocols/emailService/ISendEmailDTO';

export interface IMailTemplateProvider {
  parse(file: string, variables: IUserData): Promise<string>;
}

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse(file: string, variables: IUserData) {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
