import { v1 } from 'uuid';
import crypto from 'crypto-js';
import { Params } from '../types/params';
import { setUserKey } from './key';

const SHA256 = crypto.SHA256;

const getUserInput = () => {
  const argv = process.argv;
  const parsedArr: string[] = argv;
  console.log('cli input arr:', parsedArr);
  if (parsedArr.length === 2) {
    console.log('请输入待翻译的内容');
    process.exit(1);
  } else {
    if (parsedArr[2] === '--config') {
      setUserKey(parsedArr[3], parsedArr[4]);
      process.exit(0);
    } else {
      return argv.slice(2).join(' ');
    }
  }
};

const generateParam = (userInput: string, appKey: string, appSecure: string) => {
  const salt = v1();
  const curtime = Math.round(new Date().getTime() / 1000);

  const sign = SHA256(
    `${appKey}${userInput}${salt}${curtime}${appSecure}`
  ).toString(crypto.enc.Hex);

  const params: Params = {
    q: userInput,
    salt,
    from: 'auto',
    to: 'auto',
    appKey,
    sign,
    signType: 'v3',
    curtime,
  };

  return params;
};

export { generateParam, getUserInput };
