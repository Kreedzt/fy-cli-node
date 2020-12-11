import { Config } from '../types/config';
import fs from 'fs';
import path from 'path';
import { CONFIG_FILE, ENCODEING } from '../types/constants';

const USER_HOME = process.env.HOME || process.env.USERPROFILE;
const CONFIG_FILE_PATH = path.join(USER_HOME, CONFIG_FILE);

const getUserKey = (): {
  appKey: string;
  appSecure: string;
} => {
  try {
    const data = fs.readFileSync(CONFIG_FILE_PATH, ENCODEING);
    const { appKey, appSecure } = JSON.parse(data) as Config;
    return {
      appKey,
      appSecure
    }
  } catch (e) {
    console.error('没有应用程序ID与密钥配置, 请先使用--config进行配置');
    console.log('格式: nfy --config <应用ID> <应用密钥>');
    process.exit(1);
  }
};

const setUserKey = (appSecure: string, appKey: string) => {
  const data = {
    appKey,
    appSecure,
  };
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(data, null, 2), ENCODEING);
    console.log('写入配置成功, 文件位置:', CONFIG_FILE_PATH);
  } catch (e) {
    console.error('写入配置文件失败', e);
    process.exit(1);
  }
};

export {
  getUserKey,
  setUserKey
}