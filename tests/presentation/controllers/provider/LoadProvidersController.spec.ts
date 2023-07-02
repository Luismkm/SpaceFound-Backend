import { noContent, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { LoadProvidersController } from '@/presentation/controllers/provider/LoadProvidersController';

import { LoadAllProvidersSpy } from '@/tests/presentation/mocks/mockProvider';
import { throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: LoadProvidersController
  loadAllProvidersSpy: LoadAllProvidersSpy
}

const makeSut = ():ISutTypes => {
  const loadAllProvidersSpy = new LoadAllProvidersSpy();
  const sut = new LoadProvidersController(loadAllProvidersSpy);
  return {
    sut,
    loadAllProvidersSpy,
  };
};

describe('LoadProvider Controller', () => {
  it('should call loadProviders', async () => {
    const { sut, loadAllProvidersSpy } = makeSut();
    const loadSpy = jest.spyOn(loadAllProvidersSpy, 'loadAll');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return 200 on ok', async () => {
    const { sut, loadAllProvidersSpy } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(loadAllProvidersSpy.result));
  });

  it('should return 204 if LoadProviders returns empty', async () => {
    const { sut, loadAllProvidersSpy } = makeSut();
    jest.spyOn(loadAllProvidersSpy, 'loadAll').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if LoadProviders throws', async () => {
    const { sut, loadAllProvidersSpy } = makeSut();
    jest.spyOn(loadAllProvidersSpy, 'loadAll')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
