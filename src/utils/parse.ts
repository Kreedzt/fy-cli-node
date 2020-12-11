import { v1 } from 'uuid';
import crypto from 'crypto-js';
import { Params } from '../types/params';
import { setUserKey } from './key';
import { TransformRes } from 'res';

const SHA256 = crypto.SHA256;

const generateParamInput = (q: string) => {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

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
      return generateParamInput(argv.slice(2).join(' '));
    }
  }
};

const generateParam = (userInput: string, appKey: string, appSecure: string) => {
  const salt = v1();
  const curtime = Math.round(new Date().getTime() / 1000);

  const sign = SHA256(
    `${appKey}${generateParamInput(userInput)}${salt}${curtime}${appSecure}`
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

const displayRes = (res: TransformRes) => {
  console.log(`${res.query}\n`);

  res.translation.forEach(t => {
    console.log(t);
  });

  if (res.basic) {
    console.log('基础释义:');
    res.basic?.explains.forEach(r => {
      console.log(r);
    });
    console.log('========');
  }

  if (res.web) {
    console.log('网络释义:');
    res.web?.forEach(r => {
      console.log(r.key);
      r.value.forEach(v => {
        console.log(v);
      });
      console.log('--------');
    });
  }
};

export { generateParam, getUserInput, displayRes };
