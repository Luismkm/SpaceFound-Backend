import { UserAvatarController } from '@/presentation/controllers/user/UserAvatarController';
import { serverError, unauthorized } from '@/presentation/helpers/http/httpHelper';

import { IHttpRequest } from '@/presentation/protocols/IHttp';
import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';

import { mockAccount, throwError } from '@/tests/domain/mocks';
import { mockUpdateAvatar } from '../mocks/mockUser';

const makeFakeRequest = (): IHttpRequest => ({
  userId: 'uuid',
  file: {
    filename: 'any_name',
  },
});
type ISutTypes = {
  sut: UserAvatarController
  updateAvatarStub: IUpdateAvatar

}

const makeSut = (): ISutTypes => {
  const updateAvatarStub = mockUpdateAvatar();
  const sut = new UserAvatarController(updateAvatarStub);
  return {
    sut,
    updateAvatarStub,
  };
};

describe('UserAvatarController', () => {
  it('should return unauthorized if userId not is provided ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      file: {
        filename: 'any_name',
      },
    });
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should call updateAvatar with correc values ', async () => {
    const { sut, updateAvatarStub } = makeSut();
    const updateSpy = jest.spyOn(updateAvatarStub, 'updateAvatar');
    await sut.handle(makeFakeRequest());
    expect(updateSpy).toHaveBeenCalledWith('uuid', 'any_name');
  });

  it('should return unauthorized if user not exists', async () => {
    const { sut, updateAvatarStub } = makeSut();
    jest.spyOn(updateAvatarStub, 'updateAvatar').mockImplementationOnce(null);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return status code 200 on success', async () => {
    const { sut, updateAvatarStub } = makeSut();
    jest.spyOn(updateAvatarStub, 'updateAvatar')
      .mockReturnValueOnce(Promise.resolve(mockAccount()));
    const httpRequest = await sut.handle(makeFakeRequest());
    expect(httpRequest).toEqual({
      statusCode: 200,
      body: mockAccount(),
    });
  });

  it('Should return 500 if UpdateAvatar throws', async () => {
    const { sut, updateAvatarStub } = makeSut();
    jest.spyOn(updateAvatarStub, 'updateAvatar').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
