import { AxiosHttpClient } from '@/infra/httpClient/axiosClient';

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient();
