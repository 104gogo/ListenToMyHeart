import { get } from '../utils/http';

// 获取小说详情
export function getBook(id) {
  return get(`/book/${id}`);
}
