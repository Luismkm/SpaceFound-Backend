import MockDate from 'mockdate';
import { CreateRateController } from '@/presentation/controllers/rate/CreateRateController';
import { MissingParamError, ServerError } from '@/presentation/errors';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';

import { throwError } from '@/tests/domain/mocks';
import { CreateRateSpy } from '@/tests/presentation/mocks/mockRate';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';

const mockRequest = ():CreateRateController.Request => ({
  userId: 'any_uuid',
  providerId: 'any_uuid',
  star: 1,
  comment: 'any_comment',
});

type ISutTypes = {
  sut: CreateRateController
  createRateSpy: CreateRateSpy
  validationSpy: ValidationSpy
}

const makeSut = ():ISutTypes => {
  const createRateSpy = new CreateRateSpy();
  const validationSpy = new ValidationSpy();
  const sut = new CreateRateController(createRateSpy, validationSpy);
  return {
    sut,
    createRateSpy,
    validationSpy,
  };
};

describe('CreateRate Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toBe(request);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  it('should call CreateRate with correct values', async () => {
    const { sut, createRateSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(createRateSpy.params).toEqual({
      userId: request.userId,
      providerId: request.providerId,
      star: request.star,
      comment: request.comment,
      createdAt: new Date(),
    });
  });

  it('should return 500 if CreateRate throws ', async () => {
    const { sut, createRateSpy } = makeSut();
    jest.spyOn(createRateSpy, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should return 204 if rated with ok', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
