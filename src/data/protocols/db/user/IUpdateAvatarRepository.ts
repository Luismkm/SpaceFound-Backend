type Output = {
  avatar: string
}

export interface IUpdateAvatarRepository {
  updateAvatar(userId: string, fileName: string): Promise<Output>
}
