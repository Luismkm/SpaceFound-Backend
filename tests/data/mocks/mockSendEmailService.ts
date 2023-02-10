import { ISendEmailService } from '@/data/protocols/emailService/ISendEmailService';

export class SendEmailServiceSpy implements ISendEmailService {
  digest = true
  send(template: any) {
    return this.digest;
  }
}
