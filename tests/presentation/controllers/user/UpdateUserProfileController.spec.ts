import { UpdateProfileController } from '@/presentation/controllers/user/UpdateUserProfileController';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, noContent, serverError, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { UpdateUserProfileRepositorySpy } from '@/tests/data/mocks/mockDbUser';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): UpdateProfileController.Request => ({
  userId: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cityId: 1,
});

type ISutTypes = {
  sut: UpdateProfileController
  validationSpy: ValidationSpy
  updateUserProfileRepositorySpy: UpdateUserProfileRepositorySpy
}

const makeSut = (): ISutTypes => {
  const validationSpy = new ValidationSpy();
  const updateUserProfileRepositorySpy = new UpdateUserProfileRepositorySpy();
  const sut = new UpdateProfileController(validationSpy, updateUserProfileRepositorySpy);
  return {
    sut,
    validationSpy,
    updateUserProfileRepositorySpy,
  };
};

describe('UpdateProfileController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('any_param');
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  it('should return unauthorized if userId not is provided ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      userId: undefined,
      name: 'any_name',
      email: 'any_email',
      cityId: 1,
    });
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should call UpdateUserProfile with correct values', async () => {
    const { sut, updateUserProfileRepositorySpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(updateUserProfileRepositorySpy.params).toEqual({
      userId: request.userId,
      name: request.name,
      email: request.email,
      cityId: request.cityId,
    });
  });

  it('should return 204 user updated with successs', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, updateUserProfileRepositorySpy } = makeSut();
    jest.spyOn(updateUserProfileRepositorySpy, 'update').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
