import httpClient from './http';
import { displayRes, generateParam, getUserInput } from './utils/parse';
import { getUserKey } from './utils/key';
import { TransformRes } from 'res';


const userInput = getUserInput();

const { appKey, appSecure } = getUserKey();

const params = generateParam(userInput, appKey, appSecure);

httpClient
  .post('', params)
  .then((res) => {
    displayRes(res as unknown as TransformRes);
    process.exit(0);
  })
  .catch((err) => {
    console.log('err', err);
    process.exit(1);
  });
