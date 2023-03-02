import { noContent, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { LoadProvidersController } from '@/presentation/controllers/provider/LoadProvidersController';
import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';

import { mockProviders } from '@/tests/domain/mocks/mockProvider';
import { mockLoadProviders } from '@/tests/presentation/mocks/mockProvider';
import { throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: LoadProvidersController
  loadProvidersStub: ILoadProviders
}

const makeSut = ():ISutTypes => {
  const loadProvidersStub = mockLoadProviders();
  const sut = new LoadProvidersController(loadProvidersStub);
  return {
    sut,
    loadProvidersStub,
  };
};

describe('LoadProvider Controller', () => {
  it('should call loadProviders', async () => {
    const { sut, loadProvidersStub } = makeSut();
    const loadSpy = jest.spyOn(loadProvidersStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return 200 on ok', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(mockProviders()));
  });

  it('should return 204 if LoadProviders returns empty', async () => {
    const { sut, loadProvidersStub } = makeSut();
    jest.spyOn(loadProvidersStub, 'load').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if LoadProviders throws', async () => {
    const { sut, loadProvidersStub } = makeSut();
    jest.spyOn(loadProvidersStub, 'load')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
