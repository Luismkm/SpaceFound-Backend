import { IAd } from '@/domain/models/IAd'

export namespace ListAdsByAccount {
  export type Params = {
    accountId: string
  }

  export type Result = IAd[]
}

export interface IListAdByAccount{
  listByAccount(params: ListAdsByAccount.Params): Promise<ListAdsByAccount.Result>
}
