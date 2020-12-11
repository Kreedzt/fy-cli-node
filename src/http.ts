import axios from 'axios';
import qs from 'querystring';
import { TransformRes } from 'res';

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
  const resData = res.data as TransformRes;
  if (resData.errorCode !== "0") {
    return new Promise((_, rej) => rej(resData));
  }
  return res.data;
});

export default httpClient;