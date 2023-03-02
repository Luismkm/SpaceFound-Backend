import { IListAdByAccount } from '@/domain/usecases/ad/IListAdsByAccount'
import { noContent, serverError, ok } from '@/presentation/helpers/http/httpHelper'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class ListAdsController implements IController {
  constructor(private readonly listAd: IListAdByAccount) {}

  async handle(request: ListAdsController.Request): Promise<IHttpResponse> {
    try {
      const ads = await this.listAd.listByAccount({ accountId: request.userId })
      return ads.length ? ok(ads) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ListAdsController {
  export type Request = {
    userId: string
  }
}
