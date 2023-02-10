import ISendMailDTO from '@/data/protocols/emailService/ISendEmailDTO';
import { ISendEmailService } from '@/data/protocols/emailService/ISendEmailService';

export class SendEmailServiceSpy implements ISendEmailService {
  params: ISendEmailService.Params
  send(params: ISendMailDTO): Promise<void> {
    this.params = params
    return Promise.resolve();
  }
}
