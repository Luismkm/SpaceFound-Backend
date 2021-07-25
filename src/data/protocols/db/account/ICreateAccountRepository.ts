import { IAccount } from '@/domain/models/IAccount';

export interface ICreateAccountRepository {
  create(account: IAccount): Promise<IAccount>
}
