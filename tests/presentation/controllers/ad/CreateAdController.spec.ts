import MockDate from 'mockdate';

import { CreateAdSpy } from '@/tests/presentation/mocks/mockAd';
import { CreateAdController } from '@/presentation/controllers/ad/CreateAdController';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';
import { MissingParamError, ServerError } from '@/presentation/errors';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = ():CreateAdController.Request => ({
  userId: 'any_uuid',
  title: 'any_title',
  serviceId: '1',
  description: 'any_description',
});

type ISutTypes = {
  sut: CreateAdController
  createAdSpy: CreateAdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): ISutTypes => {
  const createAdSpy = new CreateAdSpy();
  const validationSpy = new ValidationSpy();
  const sut = new CreateAdController(createAdSpy, validationSpy);
  return {
    sut,
    createAdSpy,
    validationSpy,
  };
};

describe('CreateAd Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  it('should call CreateAd with correct values', async () => {
    const { sut, createAdSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(createAdSpy.params).toEqual({
      accountId: request.userId,
      title: request.title,
      serviceId: request.serviceId,
      description: request.description,
      createdAt: new Date(),
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
    const { sut, createAdSpy } = makeSut();
    jest.spyOn(createAdSpy, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should return 204 if CreateProvider ok', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
