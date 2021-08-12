import { CreateRateController } from '@/presentation/controllers/rate/CreateRateController';
import { MissingParamError, ServerError } from '@/presentation/errors';
import { badRequest, serverError, success } from '@/presentation/helpers/http/httpHelper';

import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';
import { IValidation } from '@/presentation/protocols/IValidation';
import { IHttpRequest } from '@/presentation/protocols';

import { mockValidation } from '@/tests/validation/mocks/mockValidation';
import { throwError } from '@/tests/domain/mocks';
import { mockCreateRate } from '../mocks/mockRate';

const mockRequest = ():IHttpRequest => ({
  userId: 'any_uuid',
  body: {
    idProvider: 'any_uuid',
    star: 1,
    comment: 'any_comment',
  },
});

type ISutTypes = {
  sut: CreateRateController
  createRateStub: ICreateRate
  validationStub: IValidation
}

const makeSut = ():ISutTypes => {
  const createRateStub = mockCreateRate();
  const validationStub = mockValidation();
  const sut = new CreateRateController(createRateStub, validationStub);
  return {
    sut,
    createRateStub,
    validationStub,
  };
};

describe('CreateRate Controller', () => {
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

  it('should call CreateRate with correct values', async () => {
    const { sut, createRateStub } = makeSut();
    const createSpy = jest.spyOn(createRateStub, 'create');
    await sut.handle(mockRequest());
    expect(createSpy).toHaveBeenCalledWith({
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 1,
      comment: 'any_comment',
    });
  });

  it('should return 500 if CreateRate throws ', async () => {
    const { sut, createRateStub } = makeSut();
    jest.spyOn(createRateStub, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(success({
      id: 1,
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 1,
      comment: 'any_comment',
    }));
  });
});
