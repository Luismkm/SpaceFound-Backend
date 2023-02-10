import nodemailer, { Transporter } from 'nodemailer';

import { IMailTemplateProvider } from '@/infra/emailTemplate/HandlebarsMailTemplateProvider';
import ISendEmailService from '@/data/protocols/emailService/ISendEmailService';
import ISendMailDTO from '@/data/protocols/emailService/ISendEmailDTO';

export class EtherealAdapter implements ISendEmailService {
  private client: Transporter;

  constructor(
    private readonly template: string,
    private readonly templateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: account.smtp.secure,
        auth: {
          user: 'elliot.auer85@ethereal.email',
          pass: 'T6kw72XNcUvhhC2DdF',
        },
      });
      this.client = transporter;
    });
  }
  public async send({ to, from, subject, userData }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: 'Distribuidora',
        address: 'testesmtpgomail@gmail.com',
      },
      to: {
        name: to.name,
        address: 'luismkm@hotmail.com',
      },
      subject,
      html: await this.templateProvider.parse(this.template, { name: 'Luis' }),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
