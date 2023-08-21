export namespace FindUserByIdRepository {
  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    cityId: number;
    createdAt: Date;
    updatedAt: Date
  }
}

export interface IFindUserByIdRepository {
  findById(id: string): Promise<FindUserByIdRepository.Result>
}
