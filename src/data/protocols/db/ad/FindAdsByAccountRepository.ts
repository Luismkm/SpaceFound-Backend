import { IAd } from '@/domain/models/IAd'

export namespace FindAdsByAccountRepository {
  export type Params = {
    accountId: string
  }

  export type Result = IAd[]

}

export interface IFindAdsByAccountRepository {
  listByAccount(id: FindAdsByAccountRepository.Params): Promise<FindAdsByAccountRepository.Result>
}
