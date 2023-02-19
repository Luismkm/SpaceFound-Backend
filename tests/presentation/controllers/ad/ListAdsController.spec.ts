import { ListAdsByAccountSpy } from '@/tests/presentation/mocks/mockAd';
import { ListAdsController } from '@/presentation/controllers/ad/ListAdsController';
import { serverError } from '@/presentation/helpers/http/httpHelper';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): ListAdsController.Request => ({
  userId: 'any_uuid',
});

type ISutTypes = {
  sut: ListAdsController
  listAdsByAccountSpy: ListAdsByAccountSpy
}

const makeSut = (): ISutTypes => {
  const listAdsByAccountSpy = new ListAdsByAccountSpy()
  const sut = new ListAdsController(listAdsByAccountSpy)
  return {
    listAdsByAccountSpy,
    sut,
  }
}

describe('List Ads Controller', () => {
  it('should call listByAccount with correct values', async () => {
    const { sut, listAdsByAccountSpy } = makeSut()
    const request = mockRequest()
    sut.handle(request)
    expect(listAdsByAccountSpy.id).toBe(request.userId)
  })

  it('should return statusCode 200 when listAdsByAccount return a value', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
  })

  it('should return statusCode 204 when listAdsByAccount return a value', async () => {
    const { sut, listAdsByAccountSpy } = makeSut()
    listAdsByAccountSpy.result = []
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(204)
  })

  test('Should return 500 if listByAccount throws', async () => {
    const { sut, listAdsByAccountSpy } = makeSut()
    jest.spyOn(listAdsByAccountSpy, 'listByAccount').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
});
