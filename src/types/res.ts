export interface WebItem {
  key: string;
  value: string[];
}

export interface DictObj {
  url: string;
}

export interface WebDictObj {
  url: string;
}

export interface BasicObj {
  explains: string[];
}

export interface TransformRes {
  errorCode: string;
  query: string;
  translation: string[];
  basic?: BasicObj;
  web?: WebItem[];
  l: string;
  dict: DictObj;
  webdict: WebDictObj;
  tSpeakUrl: string;
  speakUrl: string;
  returnPhrase: string[];
}
