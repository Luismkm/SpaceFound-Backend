import { CreateProviderController } from '@/presentation/controllers/provider/createProvider/CreateProviderController';
import { MissingParamError, ServerError } from '@/presentation/errors';
import { badRequest, serverError, success } from '@/presentation/helpers/http/httpHelper';

import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IValidation, IHttpRequest } from '@/presentation/protocols';

import { throwError } from '@/tests/domain/mocks';
import { mockCreateProvider } from '../mocks/mockProvider';
import { mockValidation } from '@/tests/validation/mocks/mockValidation';

const mockRequest = ():IHttpRequest => ({
  userId: 'any_uuid',
  body: {
    idBusiness: 0,
    description: 'any_description',
  },
});

type ISutTypes = {
  sut: CreateProviderController
  validationStub: IValidation
  createProviderStub: ICreateProviderRepository
}

const makeSut = (): ISutTypes => {
  const createProviderStub = mockCreateProvider();
  const validationStub = mockValidation();
  const sut = new CreateProviderController(createProviderStub, validationStub);
  return {
    sut,
    validationStub,
    createProviderStub,
  };
};

describe('CreateProvider Controller', () => {
  it('should call CreateAccount with correct values', async () => {
    const { sut, createProviderStub } = makeSut();
    const createSpy = jest.spyOn(createProviderStub, 'create');
    await sut.handle(mockRequest());
    expect(createSpy).toHaveBeenCalledWith({
      idUser: 'any_uuid',
      idBusiness: 0,
      description: 'any_description',
    });
  });
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpResponse = mockRequest();
    await sut.handle(httpResponse);
    expect(validateSpy).toHaveBeenLastCalledWith(httpResponse.body);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  it('should return 500 if CreateAccount throws ', async () => {
    const { sut, createProviderStub } = makeSut();
    jest.spyOn(createProviderStub, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should return 200 if CreateProvider success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(success({
      id: 'any_uuid',
      idBusiness: 0,
      description: 'any_description',
      idUser: 'any_uuid',
    }));
  });
});
