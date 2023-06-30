import { IController } from '@/presentation/protocols';
import { GoogleProviderController } from '@/presentation/controllers/login/googleProviderController';
import { GoogleApi } from '@/infra/oauth/google/googleApi';
import { AxiosHttpClient } from '@/infra/httpClient/axiosClient';
import { makeGoogleAuthentication } from '@/main/factories/usecases/login/googleAuthenticationFactory';
import { makeDbGoogleProvider } from '@/main/factories/usecases/login/googleProviderFactory';

export const makeGoogleProviderController = (): IController => {
  const httpClient = new AxiosHttpClient()
  const googleApi = new GoogleApi(httpClient)
  const controller = new GoogleProviderController(
    googleApi, // auth
    makeDbGoogleProvider(), // create
    makeGoogleAuthentication(), // token
  );
  return controller;
};
