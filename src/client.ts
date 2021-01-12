import { PREFIX_URL } from './constants';
import { AWSConfig } from './types';

export const getPrefix = async (): Promise<string> => {
  const data = await get(PREFIX_URL);
  return data.prefix;
};

export const getAWSConfig = (): Promise<AWSConfig> => {
  return get('/api/aws-config');
};

export const get = (path: string) => {
  const options = { method: 'get' };
  return request(new Request(path, options));
};

export const request = async (req: Request) => {
  const res = await fetch(req);
  const text = await res.text();
  const data = text && JSON.parse(text);
  if (!res.ok) {
    throw new Error((data && data.message) || res.statusText);
  }
  return data;
}
