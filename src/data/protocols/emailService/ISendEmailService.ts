import ISendMailDTO from './ISendEmailDTO';

export default interface ISendEmailService {
  send(params: ISendMailDTO): Promise<void>
}
