export interface IUserData {
  [key: string]: string | number;
}

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject?: string;
  userData?: IUserData
}
