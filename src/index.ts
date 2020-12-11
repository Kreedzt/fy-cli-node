import httpClient from './http';
import { generateParam, getUserInput } from './utils/parse';
import { getUserKey } from './utils/key';


const userInput = getUserInput();

const { appKey, appSecure } = getUserKey();

const params = generateParam(userInput, appKey, appSecure);

httpClient
  .post('', params)
  .then((res) => {
    console.log('res', res);
    process.exit(0);
  })
  .catch((err) => {
    console.log('err', err);
    process.exit(1);
  });
