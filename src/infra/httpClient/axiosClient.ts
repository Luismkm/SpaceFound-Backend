import axios from 'axios';
import { HttpGetClient, HttpPostClient } from './client';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post({ url, data, headers }: HttpPostClient.Params): Promise<any> {
    const result = await axios.post(url, data, { headers });
    return result.data;
  }

  async get({ url, headers }: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(url, { headers });
    return result.data;
  }
}
