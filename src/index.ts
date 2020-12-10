import * as fs from 'fs';
import * as crypto from 'crypto-js';
import axios from 'axios';
import { Params } from 'params';
import { v1 } from 'uuid';
import { Config } from 'config';

const config: Config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const { appKey, appSecure } = config;

const httpClient = axios.create({
  baseURL: 'https://openapi.youdao.com/api',
});

const SHA256 = crypto.SHA256;

console.log('crypto', crypto);

let userInput = '你好';

const timeStamp = new Date().getDate();
const salt = v1();
const curtime = Math.round(new Date().getTime() / 1000);

const sign = SHA256(
  `${appKey}${userInput}${salt}${curtime}${appSecure}`
).toString(crypto.enc.Hex);

const params: Params = {
  q: userInput,
  salt,
  from: 'zh-CHS',
  to: 'en',
  appKey,
  sign,
  signType: 'V3',
  curtime,
};

httpClient
  .post('', params)
  .then((res) => {
    console.log('res', res.data);
  })
  .catch((err) => {
    console.log('err', err);
  });
