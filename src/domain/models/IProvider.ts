export type IProvider = {
  id: string
  name: string
  description: string
  cnpj?: string
  serviceId: number
  userId: string
  createdAt: Date
  updatedAt: Date
}
