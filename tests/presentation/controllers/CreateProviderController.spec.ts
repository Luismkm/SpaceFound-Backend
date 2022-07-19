import MockDate from 'mockdate';

import { CreateProviderController } from '@/presentation/controllers/provider/createProvider/CreateProviderController';
import { MissingParamError, ServerError } from '@/presentation/errors';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';

import { throwError } from '@/tests/domain/mocks';
import { CreateProviderSpy } from '@/tests/presentation/mocks/mockProvider';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';

const mockRequest = ():CreateProviderController.Request => ({
  name: 'any_name',
  description: 'any_description',
  cnpj: 'any_cnpj',
  serviceId: 1,
  userId: 'any_uuid',
});

type ISutTypes = {
  sut: CreateProviderController
  validationSpy: ValidationSpy
  createProviderSpy: CreateProviderSpy
}

const makeSut = (): ISutTypes => {
  const createProviderSpy = new CreateProviderSpy();
  const validationSpy = new ValidationSpy();
  const sut = new CreateProviderController(createProviderSpy, validationSpy);
  return {
    sut,
    validationSpy,
    createProviderSpy,
  };
};

describe('CreateProvider Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  it('should call CreateAccount with correct values', async () => {
    const { sut, createProviderSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(createProviderSpy.params).toEqual({
      name: request.name,
      description: request.description,
      cnpj: request.cnpj,
      serviceId: request.serviceId,
      createdAt: new Date(),
      userId: request.userId,
    });
  });
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const validateSpy = jest.spyOn(validationSpy, 'validate');
    const httpResponse = mockRequest();
    await sut.handle(httpResponse);
    expect(validateSpy).toHaveBeenLastCalledWith(httpResponse);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  it('should return 500 if CreateAccount throws ', async () => {
    const { sut, createProviderSpy } = makeSut();
    jest.spyOn(createProviderSpy, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should return 204 if CreateProvider success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
