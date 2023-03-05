import { serverError, ok, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IHttpRequest } from '@/presentation/protocols';

import { throwError } from '@/tests/domain/mocks';
import { UpdateAvatarSpy } from '@/tests/presentation/mocks';
import { AvatarController } from '@/presentation/controllers/account/AvatarController';

const mockRequest = (): IHttpRequest => ({
  accountId: 'uuid',
  filename: 'any_name',
});

type ISutTypes = {
  sut: AvatarController
  updateAvatarSpy: UpdateAvatarSpy

}

const makeSut = (): ISutTypes => {
  const updateAvatarSpy = new UpdateAvatarSpy();
  const sut = new AvatarController(updateAvatarSpy);
  return {
    sut,
    updateAvatarSpy,
  };
};

describe('UserAvatarController', () => {
  it('should return unauthorized if accountId not is provided ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      filename: 'any_name',
    });
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should call updateAvatar with correc values ', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(updateAvatarSpy.params).toEqual({ accountId: request.accountId, filename: request.filename });
  });

  it('should return unauthorized if user not exists', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    jest.spyOn(updateAvatarSpy, 'updateAvatar').mockImplementationOnce(null);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return status code 200 on ok', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    const httpRequest = await sut.handle(mockRequest());
    expect(httpRequest).toEqual(ok(updateAvatarSpy.result));
  });

  it('Should return 500 if UpdateAvatar throws', async () => {
    const { sut, updateAvatarSpy } = makeSut();
    jest.spyOn(updateAvatarSpy, 'updateAvatar').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
