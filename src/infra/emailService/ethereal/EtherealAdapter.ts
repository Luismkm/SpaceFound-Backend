import nodemailer from 'nodemailer';
import { IMailTemplateProvider } from '@/infra/emailTemplate/HandlebarsMailTemplateProvider';
import ISendMailDTO from '@/data/protocols/emailService/ISendEmailDTO';
import { ISendEmailService } from '@/data/protocols/emailService/ISendEmailService';
import { EtherealSingleton } from './EtherealSingleton';

export class EtherealAdapter implements ISendEmailService {
  constructor(
    private readonly template: string,
    private readonly templateProvider: IMailTemplateProvider,
  ) {}

  public async send({ to, from, subject, userData }: ISendMailDTO): Promise<void> {
    const singletonInstance = EtherealSingleton.getInstance();
    const transporter = singletonInstance.getTransporter();

    const message = await transporter.sendMail({
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
