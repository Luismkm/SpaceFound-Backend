export type IProvider = {
  id: string
  name: string
  email: string
  description: string
  cnpj?: string
  serviceId: number
  avatar: string
  createdAt: Date
  updatedAt: Date
}
