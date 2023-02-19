import { AdPostgresRepository } from '@/infra/database/postgres/ad/AdPostgresRepository'
import { ListAdsController } from '@/presentation/controllers/ad/ListAdsController'
import { IController } from '@/presentation/protocols'

export const makeListAdsController = (): IController => {
  const postgresAdRepository = new AdPostgresRepository()
  const controller = new ListAdsController(postgresAdRepository)
  return controller
}
