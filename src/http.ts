import axios, { AxiosRequestConfig } from 'axios';
import qs from 'querystring';

const httpClient = axios.create({
  baseURL: 'https://openapi.youdao.com/api',
  transformRequest: [data => {
    return qs.stringify(data);
  }]
});

httpClient.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

httpClient.interceptors.request.use((config) => {
  return config;
});

httpClient.interceptors.response.use(res => {
  return res.data;
});

export default httpClient;