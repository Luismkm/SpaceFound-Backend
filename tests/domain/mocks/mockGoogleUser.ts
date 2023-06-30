import { CreateUserByGoogleProvider } from '@/domain/usecases/login/ICreateUserByGoogleProvider';

export const mockCreateGoogleAccountParams = (): CreateUserByGoogleProvider.Params => ({
  name: 'any_name',
  email: 'any_email',
  avatar: 'any_avatar',
  createdAt: new Date(),
});
