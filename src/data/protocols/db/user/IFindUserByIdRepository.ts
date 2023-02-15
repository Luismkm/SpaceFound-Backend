import { IUser } from '@/domain/models/IUser';

export interface IFindUserByIdRepository {
  findById(id: string): Promise<IUser | undefined>
}

export namespace FindUserByIdRepository {
  export type Params = string
  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    cityId: number;
    createdAt: Date;
  }
}

export interface IFindUserByIdRepository {
  findById(id: FindUserByIdRepository.Params): Promise<FindUserByIdRepository.Result>
}
