import { LoadProviderByIdController } from '@/presentation/controllers/provider/loadProvider/LoadProviderByIdController';
import {
  forbidden, noContent, serverError, success,
} from '@/presentation/helpers/http/httpHelper';

import { IHttpRequest, ILoadProviderById } from '@/presentation/controllers/provider/loadProvider/LoadProvidersControllerProtocols';

import { mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { mockLoadProviderById } from '../mocks/mockProvider';
import { throwError } from '@/tests/domain/mocks';
import { InvalidParamError } from '@/presentation/errors';

const makeFakeRequest = ():IHttpRequest => ({
  params: {
    providerId: 'any_uuid',
  },
});

type ISutTypes = {
  sut: LoadProviderByIdController
  loadProviderByIdStub: ILoadProviderById
}

const makeSut = ():ISutTypes => {
  const loadProviderByIdStub = mockLoadProviderById();
  const sut = new LoadProviderByIdController(loadProviderByIdStub);
  return {
    sut,
    loadProviderByIdStub,
  };
};

describe('LoadProvider Controller', () => {
  it('should call loadProviders with correct value', async () => {
    const { sut, loadProviderByIdStub } = makeSut();
    const loadSpy = jest.spyOn(loadProviderByIdStub, 'loadById');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(success(mockProviderProfile()));
  });

  it('Should return 403 if LoadProviderById returns null', async () => {
    const { sut, loadProviderByIdStub } = makeSut();
    jest.spyOn(loadProviderByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('providerId')));
  });

  it('Should return 500 if LoadProviders throws', async () => {
    const { sut, loadProviderByIdStub } = makeSut();
    jest.spyOn(loadProviderByIdStub, 'loadById')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
