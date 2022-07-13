import { UserAvatarController } from '@/presentation/controllers/user/UserAvatarController';
import { serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelper';

import { mockAccount, throwError } from '@/tests/domain/mocks';
import { UpdateAvatarSpy } from '../mocks';
import { IHttpRequest } from '@/presentation/protocols';

const mockRequest = (): IHttpRequest => ({
  userId: 'uuid',
  file: {
    fileName: 'any_name',
  },
});
type ISutTypes = {
  sut: UserAvatarController
  updateAvatarSpy: UpdateAvatarSpy

}

const makeSut = (): ISutTypes => {
  const updateAvatarSpy = new UpdateAvatarSpy();
  const sut = new UserAvatarController(updateAvatarSpy);
  return {
    sut,
    updateAvatarSpy,
  };
};

describe('UserAvatarController', () => {
  it('should return unauthorized if userId not is provided ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      file: {
        fileName: 'any_name',
      },
    });
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should call updateAvatar with correc values ', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(updateAvatarSpy.params).toEqual({ userId: request.userId, fileName: request.file.fileName });
  });

  it('should return unauthorized if user not exists', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    jest.spyOn(updateAvatarSpy, 'updateAvatar').mockImplementationOnce(null);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return status code 200 on success', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    const httpRequest = await sut.handle(mockRequest());
    expect(httpRequest).toEqual(success(updateAvatarSpy.result));
  });

  it('Should return 500 if UpdateAvatar throws', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    jest.spyOn(updateAvatarSpy, 'updateAvatar').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
