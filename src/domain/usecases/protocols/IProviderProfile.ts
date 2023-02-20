type IProfile = {
  id: number
  serviceId: string
  description: string
  idUser: string
  idProvider: string
  star: number
  comment: string
}

export interface IProviderProfile {
  provider: IProfile[]
  averageStars: number
}
