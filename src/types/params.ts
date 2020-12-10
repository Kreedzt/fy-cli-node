export interface Params {
  q: string;
  from: string;
  to: string;
  appKey: string;
  salt: string;
  sign: string;
  signType: string;
  curtime: string | number;
  ext?: string;
  voice?: number;
  strict?: boolean;
  vocabld?: string;
}
