export type IUser = {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
  /* isVerifiedAccount: boolean */
  cityId: number
  createdAt: Date
}
