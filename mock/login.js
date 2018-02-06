import Mock from 'mockjs';
import { delay } from './utils';

export async function getCode() {
  const data = Mock.mock({
    code: /\d{4}/
  });
  await delay();
  return data.code;
}
