import { forbidden, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { IHttpRequest } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';
import { LoadProviderByIdController } from '@/presentation/controllers/provider/LoadProviderByIdController';

import { throwError } from '@/tests/domain/mocks';
import { LoadProviderByIdSpy } from '@/tests/presentation/mocks/mockProvider';
import { mockProviderProfile } from '@/tests/domain/mocks/mockProvider';

const makeFakeRequest = ():IHttpRequest => ({
  params: {
    providerId: 'any_uuid',
  },
});

type ISutTypes = {
  sut: LoadProviderByIdController
  loadProviderByIdSpy: LoadProviderByIdSpy
}

const makeSut = ():ISutTypes => {
  const loadProviderByIdSpy = new LoadProviderByIdSpy();
  const sut = new LoadProviderByIdController(loadProviderByIdSpy);
  return {
    sut,
    loadProviderByIdSpy,
  };
};

describe('LoadProvider Controller', () => {
  it('should call loadProviders with correct value', async () => {
    const { sut, loadProviderByIdSpy } = makeSut();
    await sut.handle(makeFakeRequest());
    expect(loadProviderByIdSpy.id).toBe('any_uuid');
  });

  it('should return 200 on ok', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(mockProviderProfile()));
  });

  it('Should return 403 if LoadProviderById returns null', async () => {
    const { sut, loadProviderByIdSpy } = makeSut();
    jest.spyOn(loadProviderByIdSpy, 'load').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('providerId')));
  });

  it('Should return 500 if LoadProviders throws', async () => {
    const { sut, loadProviderByIdSpy } = makeSut();
    jest.spyOn(loadProviderByIdSpy, 'load')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
