import { IProviderProfile } from '../protocols/IProviderProfile';

export interface ILoadProviderById {
  loadById(id: string): Promise<IProviderProfile>
}
